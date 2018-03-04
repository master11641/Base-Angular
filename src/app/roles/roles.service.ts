import { Role } from "app/user-operations/Models/Role.";

import { PagedQueryResult } from "./../simple-grid/paged-query-result";

import { Observable } from "rxjs/Observable";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfigService } from "app/core/app-config.service";
import { PagedQueryModel } from "app/simple-grid/paged-query-model";

@Injectable()
export class RolesService {
  private userListUrl = "/api/roles";
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.userListUrl = config.configuration.host + this.userListUrl;
  }
  getPagedList(
    queryModel: PagedQueryModel
  ): Observable<PagedQueryResult<Role>> {
    return this.http
      .get<PagedQueryResult<Role>>(
        `${this.userListUrl}?${this.toQueryString(queryModel)}`
      )
      .map(result => {
        return new PagedQueryResult<Role>(result.totalItems, result.items);
      });
  }

  toQueryString(obj: any): string {
    const parts = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (value !== null && value !== undefined) {
          parts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      }
    }
    return parts.join("&");
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error("observable error: ", error);
    return Observable.throw(error.statusText);
  }
  update(id: number, item: Role): Observable<Role> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<Role>(`${this.userListUrl}`, JSON.stringify(item), {
        headers: header
      })
      .map(response => response || {})
      .catch(this.handleError);
  }
  add(item: Role): Observable<Role> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<Role>(`${this.userListUrl}`, JSON.stringify(item), {
        headers: header
      })
      .map(response => response || {})
      .catch(this.handleError);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.userListUrl}/${id}`);
  }
}
