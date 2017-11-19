import { AntiVirusType } from './models/antivirus-type';
import { AppConfigService } from './../app.config';


import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Config} from '../config';

@Injectable()
export class AntivirusTypeService {
  private allUrl =  '';
  private deleteUrl =  '';
  private addUrl =  '';
  private editUrl = '';
  constructor(private http: Http,private AppConfig:AppConfigService) {
    this. allUrl =  this.AppConfig.apiRoot+'/api/antiviruses';
    this. deleteUrl =  this.AppConfig.apiRoot+'/api/deleteantivirus';
    this. addUrl =  this.AppConfig.apiRoot+'/api/addantivirus';
    this. editUrl = this.AppConfig.apiRoot+ '/api/editantivirus';

  }
  getAll(): Observable<AntiVirusType[]> {
    return this.http.get(this.allUrl)
      .map(response => <AntiVirusType[]>response.json());
  }
  delete(id: number): Observable<boolean> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id.toString());
    const body = urlSearchParams.toString();
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(this.deleteUrl, body, { headers: headers })
      .map(res => {
        return res.json();
      });
  }
  add(_PersonGroup: AntiVirusType): Observable<AntiVirusType> {
    const headers = new Headers({ 'Content-Type': 'application/json' }); // for ASP.NET MVC
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.addUrl, JSON.stringify(_PersonGroup), options)
      .map((response) => <AntiVirusType>response.json())
      .do(data => console.log('PersonGroup: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  edit(_PersonGroup: AntiVirusType): Observable<AntiVirusType> {
    const headers = new Headers({ 'Content-Type': 'application/json' }); // for ASP.NET MVC
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.editUrl, JSON.stringify(_PersonGroup), options)
      .map((response) => <AntiVirusType>response.json())
      .do(data => console.log('Hero: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
