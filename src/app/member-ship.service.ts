import { Login } from './CommonModels/login';
import { VerifyCode } from './CommonModels/verifyCode';
import { MobileVm } from './CommonModels/mobile';
import { RequestMsg } from './CommonModels/ResponseMsg';
import { AppConfigService } from './app.config';
import { FileUploadModule } from 'ng2-file-upload';

import { Router } from '@angular/router';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { UserStatus } from './account/UserStatus';

@Injectable()
export class MemberShipService implements OnInit {
  public _UserStatus: UserStatus;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
mobileCheckUrl:string;
verifyCodeUrl:string;
loginUrl:string;

  constructor(private _http: Http, private router: Router,private AppConfig:AppConfigService) {
    this.mobileCheckUrl=this.AppConfig.apiRoot+'/api/register/sms';
    this.verifyCodeUrl=this.AppConfig.apiRoot+'/api/register/confirm';
    this.loginUrl=this.AppConfig.apiRoot+'/api/login';
    console.log(this.AppConfig.apiRoot);
    //this.redirectUrl = '/account/login';
    if(!!UserStatus){
        this.fillUserStatusOnBoot();
    }

  }
  checkMobileNumber(MobileVm:MobileVm): Observable<RequestMsg> {
    const headers = new Headers({ 'Content-Type': 'application/json' }); // for ASP.NET MVC
    const options = new RequestOptions({ headers: headers });
    return this._http
      .post(this.mobileCheckUrl, JSON.stringify(MobileVm), options)
      .map(response => <RequestMsg>response.json())
      .do(data => console.log('checkMobileNumber return: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  verifyCode(VerifyCode:VerifyCode){
    console.log(VerifyCode);
    const headers = new Headers({ 'Content-Type': 'application/json' }); // for ASP.NET MVC
    const options = new RequestOptions({ headers: headers });
    return this._http
      .post(this.verifyCodeUrl, JSON.stringify(VerifyCode), options)
      .map(response => <RequestMsg>response.json())
      .do(data => console.log('verifyCode: ' + JSON.stringify(data)))
      .catch(this.handleError);
    }
    LoginNew(Login:Login){
      console.log(Login);
      const headers = new Headers({ 'Content-Type': 'application/json' }); // for ASP.NET MVC
      const options = new RequestOptions({ headers: headers });
      return this._http
        .post(this.loginUrl, JSON.stringify(Login), options)
        .map(response => <RequestMsg>response.json())
        .do(data => console.log('Login: ' + JSON.stringify(data)))
        .catch(this.handleError);
      }

  fillUserStatusOnBoot() {
    this._UserStatus = new UserStatus();
    const token = localStorage.getItem('access_token');
    if (token == null) {
      this._UserStatus = new UserStatus();
      this._UserStatus.IsAuthenticated = false;
      this._UserStatus.Name = 'کاربر ناشناس';
      this._UserStatus.LastLogin = new Date();
      this._UserStatus.RoleName = 'فاقد نقش';
      this._UserStatus.UserName = 'ناشناس';

    }
    this.GetUserStatus().subscribe(x => {
      this._UserStatus = x;
      this.router.navigateByUrl(this.redirectUrl);
    });
  }
  createAuthorizationHeader(headers: Headers, token: string) {
    headers.append('Authorization', 'Bearer ' + token);
  }
  GetUserStatus(): Observable<UserStatus> {
    let headers = new Headers();
    const token = localStorage.getItem('access_token');
    this.createAuthorizationHeader(headers, token);
    return this._http.get(this.AppConfig.apiRoot+'/account/restricted', {
      headers: headers
    }).map(response => <UserStatus>response.json());

  }
  isLoggedIn(): Observable<boolean> {

    let headers = new Headers();
    const token = localStorage.getItem('access_token');
    this.createAuthorizationHeader(headers, token);
    return this._http.get(this.AppConfig.apiRoot+'/account/islogin', {
      headers: headers
    }).map(response => <boolean>response.json());
  }
  login(username: string, password: string): any {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.AppConfig.apiRoot+'/api/login', body, { headers: headers })
      .map(res => {
        return res.json();
      })
      .do(res => {
        const token = res.token;
        localStorage.setItem('access_token', token);
        alert('ورود موفقیت آمیز');
        // this.GetUserStatus().subscribe(x => {
        //   this._UserStatus = x;
        //   if(this._UserStatus.RoleName.includes('Admin')){
        //     this.router.navigateByUrl('/admin/dashboard');
        //   }else{
        //      this.router.navigateByUrl('/admin/dashboard');
        //   }

        // });


      })
      ;
  }



  loginBase(username: string, password: string): any {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    urlSearchParams.append('password', password);
    urlSearchParams.append('grant_type', 'password');
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post(this.AppConfig.apiRoot+'/account/login', body, { headers: headers })
      .map(res => {
        return res.json();
      }) ;

  }
  logout(): void {
    localStorage.removeItem('access_token');
    this._UserStatus = null;
    this.router.navigateByUrl('/account/login');
  }
  ngOnInit() {
    this.redirectUrl = '/account/login';
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
