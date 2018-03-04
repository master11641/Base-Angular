import { Contact } from "./contact";
import { AppConfigService } from "./../core/app-config.service";
import { PagedQueryModel } from "../simple-grid/paged-query-model";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Injectable } from "@angular/core";
import { PagedQueryResult } from "../simple-grid/paged-query-result";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ContactService {
  private baseUrl = "/api/contacts";
  private allCatsUrl = "/api/allcatacts";
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.baseUrl = this.config.configuration.host + this.baseUrl;
    this.allCatsUrl = this.config.configuration.host + this.allCatsUrl;
  }

  getPagedProductsList(
    queryModel: PagedQueryModel
  ): Observable<PagedQueryResult<Contact>> {
    return this.http
      .get<PagedQueryResult<Contact>>(
        `${this.baseUrl}?${this.toQueryString(queryModel)}`
      )
      .map(result => {
        return new PagedQueryResult<Contact>(result.totalItems, result.items);
      });
  }

  getPagedActivatedContact(
    queryModel: PagedQueryModel
  ): Observable<PagedQueryResult<Contact>> {
    return this.http
      .get<PagedQueryResult<Contact>>(
        `${this.baseUrl}/activatecontacts?${this.toQueryString(queryModel)}`
      )
      .map(result => {
        return new PagedQueryResult<Contact>(result.totalItems, result.items);
      });
  }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.allCatsUrl);
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
  addAppProduct(item: Contact): Observable<Contact> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<Contact>(`${this.baseUrl}`, JSON.stringify(item), {
        headers: header
      })
      .map(response => response || {})
      .catch(this.handleError);
  }

  updateAppProduct(id: number, item: Contact): Observable<Contact> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<Contact>(`${this.baseUrl}`, JSON.stringify(item), {
        headers: header
      })
      .map(response => response || {})
      .catch(this.handleError);
  }

  confirmComment(id: number) {
    const header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("id", `${id}`);
    const body = urlSearchParams.toString();
    return this.http.post<Contact>(`${this.baseUrl}/confirm`, body, {
      headers: header
    });
  }
  setReadComment(id: number) {
    const header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("id", `${id}`);
    const body = urlSearchParams.toString();
    return this.http.post<Contact>(`${this.baseUrl}/read`, body, {
      headers: header
    });
  }
  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/getcontactbyid/${id}`);
  }
  deleteAppProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
