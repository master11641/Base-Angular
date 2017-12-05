import { ProductCategory } from "./product-category";
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
export class ProductCategoryService {
  private baseUrl = "http://localhost:8080/api/productcategories";
  constructor(private http: HttpClient) {}

  getPagedProductsList(
    queryModel: PagedQueryModel
  ): Observable<PagedQueryResult<ProductCategory>> {
    return this.http
      .get<PagedQueryResult<ProductCategory>>(
        `${this.baseUrl}?${this.toQueryString(queryModel)}`
      )
      .map(result => {
        return new PagedQueryResult<ProductCategory>(
          result.totalItems,
          result.items
        );
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
  addAppProduct(item: ProductCategory): Observable<ProductCategory> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .post<ProductCategory>(`${this.baseUrl}`, JSON.stringify(item), {
        headers: header
      })
      .map(response => response || {})
      .catch(this.handleError);
  }

  updateAppProduct(id: number, item: ProductCategory): Observable<ProductCategory> {
    const header = new HttpHeaders({ "Content-Type": "application/json" });
    return this.http
      .put<ProductCategory>(
        `${this.baseUrl}`,
        JSON.stringify(item),
        { headers: header }
      )
      .map(response => response || {})
      .catch(this.handleError);
  }

  deleteAppProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}//service
