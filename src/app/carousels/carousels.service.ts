import { Carousel } from "./models/carousels";

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
export class CarouselsService {
  private baseUrl = "/api/calousels";
  private allCatsUrl = "/api/allcats";
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.baseUrl = this.config.configuration.host + this.baseUrl;
    this.allCatsUrl = this.config.configuration.host + this.allCatsUrl;
  }

  getPagedList(
    queryModel: PagedQueryModel
  ): Observable<PagedQueryResult<Carousel>> {
    return this.http
      .get<PagedQueryResult<Carousel>>(
        `${this.baseUrl}?${this.toQueryString(queryModel)}`
      )
      .map(result => {
        return new PagedQueryResult<Carousel>(
          result.totalItems,
          result.items
        );
      });
  }
  getAll(): Observable<Carousel[]> {
    return this.http.get<Carousel[]>(this.allCatsUrl);
  }
  getActivated(): Observable<Carousel[]> {
    return this.http.get<Carousel[]>(`${this.baseUrl}/activatedcalousels`);
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
  add(item: Carousel): Observable<Carousel> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<Carousel>(`${this.baseUrl}`, JSON.stringify(item), {
        headers: header
      })
      .map(response => response || {})
      .catch(this.handleError);
  }

  update(id: number, item: Carousel): Observable<Carousel> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<Carousel>(`${this.baseUrl}`, JSON.stringify(item), {
        headers: header
      })
      .map(response => response || {})
      .catch(this.handleError);
  }
  documentsByOrderid(
    orderid: number
  ): Observable<Carousel[]> {
    const header = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded"
    });
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("orderid", `${orderid}`);
    const body = urlSearchParams.toString();
    return this.http.post<Carousel[]>(`${this.baseUrl}/byuserid`, body, {
      headers: header
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
