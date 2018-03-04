import {
  AppConfigService
} from "./../core/app-config.service";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Register } from "./models/register";
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthenticationService {
  private RegisterApiUrl = "/api/users";
  constructor(
    private _HttpClient: HttpClient,
    private _AppConfigService: AppConfigService
  ) {
    this.RegisterApiUrl =
      this._AppConfigService.configuration.host + this.RegisterApiUrl;
  }
  Register(register: Register): Observable<any> {
    const userTemp = {
      "FullName": register.UserName,
      "Email": register.UserName,
      "Password": register.Password
    }
    const httpHeader = new HttpHeaders()
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    return this._HttpClient.post<Register>(this.RegisterApiUrl, JSON.stringify(userTemp), {
      headers: httpHeader
    });
  }
}
