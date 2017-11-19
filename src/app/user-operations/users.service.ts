import { AppConfigService } from './../app.config';
import { User } from './Models/User';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// در صورت استفاده نکردن از متد

@Injectable()
export class UsersService {
  private prefixUrl = '';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private heroesUrl = '';
  private heroByIdUrl = '';
  private editHeroUrl = '';
  private createHeroUrl = '';
  private checkExistUser = '';
  private deleteUserUrl = '';
  constructor(private http: Http,private AppConfig:AppConfigService) {
    console.log(this.AppConfig.apiRoot);
    this.prefixUrl=this.AppConfig.apiRoot;
    this.heroesUrl = this.prefixUrl + '/api/users';
    this. heroByIdUrl = this.prefixUrl + '/api/user/dettail/';
    this. editHeroUrl = this.prefixUrl + '/api/user/edit';
    this. createHeroUrl = this.prefixUrl + '/api/register/signup';
    this. checkExistUser = this.prefixUrl + '/api/user/checkExistUser';
    this. deleteUserUrl = this.prefixUrl + '/api/user/delete';
  }
  //result: any;
  // getConfiguration(key) {
  //   return this.http.get('/assets/config.development.json').map(res => {
  //     this.result = res.json();
  //     return this.result[key];
  //   });
  // }
  getUsers(): Observable<User[]> {
    return this.http
      .get(this.heroesUrl)
      .map(response => <User[]>response.json());
  }
  getHero(id: number): Observable<User> {
    return this.getUsers().map(heroes => heroes.find(hero => hero.ID === id));
  }
  getHeroHighPerformance(id: number): Promise<User> {
    return this.http
      .get(this.heroByIdUrl + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
  edit(user: User): Observable<User> {
    const headers = new Headers({ 'Content-Type': 'application/json' }); // for ASP.NET MVC
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.editHeroUrl, JSON.stringify(user), options)
      .map(response => <User>response.json())
      .do(data => console.log('Hero: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  createHero(user: User): Observable<User> {
    console.log(user);
    const headers = new Headers({ 'Content-Type': 'application/json' }); // for ASP.NET MVC
    const options = new RequestOptions({ headers: headers });
    return this.http
      .post(this.createHeroUrl, JSON.stringify(user), options)
      .map(response => <User>response.json())
      .do(data => console.log('user: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  checkExistUserName(username: string): Observable<boolean> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', username);
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .post(this.checkExistUser, body, { headers: headers })
      .map(res => {
        return res.json();
      });
  }
  delete(id: number): Observable<boolean> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http
      .post(this.deleteUserUrl, body, { headers: headers })
      .map(res => {
        return res.json();
      });
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
