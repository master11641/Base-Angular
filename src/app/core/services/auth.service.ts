import { AppConfigService } from "app/core/app-config.service";
import { AppConfig } from "./../app-config.service";
import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import * as jwt_decode from "jwt-decode";
import "rxjs/add/observable/interval";
import "rxjs/add/observable/timer";

import { APP_CONFIG, IAppConfig } from "./app.config";
import { BrowserStorageService } from "../browser-storage.service";
import { Credentials } from "./../models/credentials";
import { AuthUser } from "./../models/auth-user";
import { Alert } from "selenium-webdriver";

export enum AuthTokenType {
  AccessToken,
  RefreshToken
}

@Injectable()
export class AuthService {
  private rememberMeToken = "rememberMe_token";

  private authStatusSource = new BehaviorSubject<boolean>(false);
  authStatus$ = this.authStatusSource.asObservable();

  private refreshTokenSubscription: Subscription;

  constructor(
    // @Inject(APP_CONFIG) private appConfig: IAppConfig,
    private browserStorageService: BrowserStorageService,
    private http: HttpClient,
    private router: Router,
    private config: AppConfigService
  ) {
    this.updateStatusOnPageRefresh();
    this.scheduleRefreshToken();
  }

  login(credentials: Credentials): Observable<boolean> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post(
        `${this.config.configuration.apiEndpoint}/${this.config.configuration.loginPath}`,
        credentials,
        { headers: headers }
      )
      .map((response: any) => {
        this.browserStorageService.setLocal(
          this.rememberMeToken,
          credentials.RememberMe
        );
        if (!response) {
          this.authStatusSource.next(false);
          return false;
        }
        this.setLoginSession(response);
        this.scheduleRefreshToken();
        this.authStatusSource.next(true);
        return true;
      })
      .catch((error: HttpErrorResponse) => Observable.throw(error));
  }

  getBearerAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.getRawAuthToken(AuthTokenType.AccessToken)}`
    });
  }

  logout(navigateToHome: boolean): void {
    this.http
      .get(`${this.config.configuration.apiEndpoint}/${this.config.configuration.logoutPath}`)
      .finally(() => {
        this.deleteAuthTokens();
        this.unscheduleRefreshToken();
        this.authStatusSource.next(false);
        if (navigateToHome) {
          this.router.navigate(["/"]);
        }
      })
      .map(response => response || {})
      .catch((error: HttpErrorResponse) => Observable.throw(error))
      .subscribe(result => {
        console.log("logout", result);
      });
  }

  isLoggedIn(): boolean {
    const accessToken = this.getRawAuthToken(AuthTokenType.AccessToken);
    const refreshToken = this.getRawAuthToken(AuthTokenType.RefreshToken);
    const hasTokens =
      !this.isEmptyString(accessToken) && !this.isEmptyString(refreshToken);

    return hasTokens && !this.isAccessTokenTokenExpired();
    //return hasTokens;
  }

  rememberMe(): boolean {
    return this.browserStorageService.getLocal(this.rememberMeToken) === true;
  }

  getRawAuthToken(tokenType: AuthTokenType): string {
    if (this.rememberMe()) {
      return this.browserStorageService.getLocal(AuthTokenType[tokenType]);
    } else {
      return this.browserStorageService.getSession(AuthTokenType[tokenType]);
    }
  }

  getDecodedAccessToken(): any {
    return jwt_decode(this.getRawAuthToken(AuthTokenType.AccessToken));
  }

  getDisplayName(): string {
    return this.getDecodedAccessToken().displayName;
  }

  getAuthUser(): AuthUser {
    if (!this.isLoggedIn()) {
      return null;
    }
    const decodedToken = this.getDecodedAccessToken();
    console.log(decodedToken);
    let roles = decodedToken["roles"];
    if (roles) {
      roles = roles.map(role => role.toLowerCase());
    }
    return Object.freeze({
      userId: decodedToken["userId"],
      userName: decodedToken["userName"],
      displayName: decodedToken["displayName"],
      roles: roles
    });
  }

  isAuthUserInRoles(requiredRoles: string[]): boolean {
    const user = this.getAuthUser();

    if (!user || !user.roles) {
      return false;
    }
    return requiredRoles.some(
      requiredRole => user.roles.indexOf(requiredRole.toLowerCase()) >= 0
    );
  }

  isAuthUserInRole(requiredRole: string): boolean {
    return this.isAuthUserInRoles([requiredRole]);
  }

  getAccessTokenExpirationDateUtc(): Date {
    const decoded = this.getDecodedAccessToken();
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0); // The 0 sets the date to the epoch
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isAccessTokenTokenExpired(): boolean {
    const expirationDateUtc = this.getAccessTokenExpirationDateUtc();
    console.log(expirationDateUtc);
    // alert(expirationDateUtc);
    if (!expirationDateUtc) {
      return true;
    }
    return !(expirationDateUtc.valueOf() > new Date().valueOf());
  }

  deleteAuthTokens() {
    if (this.rememberMe()) {
      this.browserStorageService.removeLocal(
        AuthTokenType[AuthTokenType.AccessToken]
      );
      this.browserStorageService.removeLocal(
        AuthTokenType[AuthTokenType.RefreshToken]
      );
    } else {
      this.browserStorageService.removeSession(
        AuthTokenType[AuthTokenType.AccessToken]
      );
      this.browserStorageService.removeSession(
        AuthTokenType[AuthTokenType.RefreshToken]
      );
    }
    this.browserStorageService.removeLocal(this.rememberMeToken);
  }

  scheduleRefreshToken() {
    if (!this.isLoggedIn()) {
      return;
    }

    this.unscheduleRefreshToken();

    const expiresAtUtc = this.getAccessTokenExpirationDateUtc().valueOf();
    const nowUtc = new Date().valueOf();
    const initialDelay = Math.max(1, expiresAtUtc - nowUtc);
    console.log("Initial scheduleRefreshToken Delay(ms)", initialDelay);
    const timerSource$ = Observable.timer(initialDelay);
    this.refreshTokenSubscription = timerSource$.subscribe(() => {
      this.refreshToken();
    });
  }

  unscheduleRefreshToken() {
    if (this.refreshTokenSubscription) {
      this.refreshTokenSubscription.unsubscribe();
    }
  }

  refreshToken() {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const model = {
      refreshToken: this.getRawAuthToken(AuthTokenType.RefreshToken)
    };
    return this.http
      .post(
        `${this.config.configuration.apiEndpoint}/${this.config.configuration.refreshTokenPath}`,
        model,
        { headers: headers }
      )
      .finally(() => {
        this.scheduleRefreshToken();
      })
      .map(response => response || {})
      .catch((error: HttpErrorResponse) => Observable.throw(error))
      .subscribe(result => {
        console.log("RefreshToken Result", result);
        this.setLoginSession(result);
      });
  }

  private updateStatusOnPageRefresh(): void {
    this.authStatusSource.next(this.isLoggedIn());
  }

  private setLoginSession(response: any): void {
    this.setToken(
      AuthTokenType.AccessToken,
      response[this.config.configuration.accessTokenObjectKey]
    );
    this.setToken(
      AuthTokenType.RefreshToken,
      response[this.config.configuration.refreshTokenObjectKey]
    );
    console.log("Logged-in user info", this.getAuthUser());
  }

  private setToken(tokenType: AuthTokenType, tokenValue: string): void {
    if (this.rememberMe()) {
      this.browserStorageService.setLocal(AuthTokenType[tokenType], tokenValue);
    } else {
      this.browserStorageService.setSession(
        AuthTokenType[tokenType],
        tokenValue
      );
    }
  }

  private isEmptyString(value: string): boolean {
    return !value || 0 === value.length;
  }
}
