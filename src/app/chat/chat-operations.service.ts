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
export class ChatOperationsService {
  private baseUrl = "/api/chat";
  constructor(private http: HttpClient, private config: AppConfigService) {
    this.baseUrl = this.config.configuration.host + this.baseUrl;
  }
  connect(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/connect`);
  }
  getAllConnectedUser(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/onlineuser`);
  }
  getAdminConnectedUser(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/onlineadmins`);
  }
}
