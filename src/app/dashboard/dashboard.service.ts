import { Order } from "app/simple-grid/order";

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
export class DashboardService {
  private dashboardUrl = "/api/dashboard";
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.dashboardUrl = this.config.configuration.host + this.dashboardUrl;
  }

  getProductOrdersChart(): Observable<any> {
    return this.http
      .get(`${this.dashboardUrl}/productorderchartdata`)
      .map(res => res);
  }
  getPaymentChart(): Observable<any> {
    return this.http
      .get(`${this.dashboardUrl}/paymentchartdata`)
      .map(res => res);
  }
  getOrderItemChart(): Observable<any> {
    return this.http
      .get(`${this.dashboardUrl}/orderitemchartdata`)
      .map(res => res);
  }
  getOrdersCount(): Observable<number> {
    return this.http.get(`${this.dashboardUrl}/orderscount`).map(res =><number>res);
  }
 getUnreadCommentsCount(): Observable<number> {
    return this.http.get(`${this.dashboardUrl}/unreadcommentscount`).map(res =><number>res);
  }

  getPaymentSum(): Observable<number> {
    return this.http.get(`${this.dashboardUrl}/paymentcount`).map(res =><number>res);
  }
}
