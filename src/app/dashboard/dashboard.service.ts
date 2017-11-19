import { AppConfigService } from './../app.config';
import { User } from './../user-operations/Models/User';
import { DisplayValue } from './../CommonModels/DisplayValue';
import { ValueText } from './../CommonModels/value-text';
import { Observable } from "rxjs/Observable";

import { Http } from "@angular/http";
import { Injectable } from "@angular/core";


@Injectable()
export class DashboardService {

  private tagSkillCountUrl = '';
  private relationsCountUrl ='';
  private usersCountUrl = '';
  private relationTagsCountUrl = '';
    private skillTagChartDataUrl ='';
    private relationTagChartDataUrl = '';
    private topUsersUrl = '';
    constructor(private http: Http,private AppConfig:AppConfigService) {
      this.tagSkillCountUrl = this.AppConfig.apiRoot+"/api/dashboard/skilltagscount";
      this. relationsCountUrl = this.AppConfig.apiRoot+"/api/dashboard/relationscount";
      this. usersCountUrl = this.AppConfig.apiRoot+"/api/dashboard/userscount";
      this. relationTagsCountUrl = this.AppConfig.apiRoot+"/api/dashboard/relationtagscount";
        this. skillTagChartDataUrl =this.AppConfig.apiRoot+ "/api/dashboard/skilltagchartdata";
        this. relationTagChartDataUrl = this.AppConfig.apiRoot+"/api/dashboard/relationtagchartdata";
        this. topUsersUrl = this.AppConfig.apiRoot+"/api/dashboard/topusers";

      }
    getTagSkillCount(): Observable<number> {
    return this.http.get(this.tagSkillCountUrl).map(res => <number>res.json());
  }
  getRelationsCount(): Observable<number> {
    return this.http.get(this.relationsCountUrl).map(res => <number>res.json());
  }
  getUsersCount(): Observable<number> {
    return this.http.get(this.usersCountUrl).map(res => <number>res.json());
  }
  getRelationTagsCount(): Observable<number> {
    return this.http.get(this.relationTagsCountUrl).map(res => <number>res.json());
  }
  getSkillTagChartData(): Observable<DisplayValue[]> {
    return this.http.get(this.skillTagChartDataUrl).map(res => <DisplayValue[]>res.json());
  }
   getRelationTagChartData(): Observable<DisplayValue[]> {
    return this.http.get(this.relationTagChartDataUrl).map(res => <DisplayValue[]>res.json());
  }
  getTopUsers(): Observable<User[]> {
    return this.http.get(this.topUsersUrl).map(res => <User[]>res.json());
  }
}
