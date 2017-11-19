import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { CustomHttp } from './../extends/CustomHttp ';
import { UserStatus } from './../../account/UserStatus';
import { Injectable } from '@angular/core';

@Injectable()
export class IdentityService {
  constructor(private _http:Http) { }
  public _UserStatus;
  redirectUrl: string;
public load():any{
  let headers = new Headers();
  const token = localStorage.getItem('access_token');
  this.createAuthorizationHeader(headers, token);
  return this._http.get('http://localhost:8008'+'/account/restricted', {
    headers: headers
  }).map(response =>{
    this._UserStatus=  <UserStatus>response.json();
    console.log('from appInit'+this._UserStatus);


  }   );
}
createAuthorizationHeader(headers: Headers, token: string) {
  headers.append('Authorization', 'Bearer ' + token);
}

login(username: string, password: string): any {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append('username', username);
  urlSearchParams.append('password', password);
  urlSearchParams.append('grant_type', 'password');
  const body = urlSearchParams.toString();
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  return this._http.post('http://localhost:8008'+'/account/login', body, { headers: headers })
    .map(res => {
      return res.json();
    }) ;

}
GetUserStatus(): Observable<UserStatus> {
  let headers = new Headers();
  const token = localStorage.getItem('access_token');
  this.createAuthorizationHeader(headers, token);
  return this._http.get('http://localhost:8008'+'/account/restricted', {
    headers: headers
  }).map(response => <UserStatus>response.json());

}

}
