import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpRequest,
  HttpProgressEvent,
  HttpEvent
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { Ticket } from "./ticket";

@Injectable()
export class UploadFileWithProgressBarService {
  private baseUrl = "http://localhost:8080/api/upload1";

  constructor(private http: HttpClient) {}

  postTicket(ticket: Ticket, filesList: FileList): Observable<HttpEvent<any>> {
    if (!filesList || filesList.length === 0) {
      return Observable.throw("Please select a file.");
    }

    const formData: FormData = new FormData();

    for (const key in ticket) {
      if (ticket.hasOwnProperty(key)) {
        formData.append(key, ticket[key]);
      }
    }

    for (let i = 0; i < filesList.length; i++) {
   //  formData.append(filesList[i].name, filesList[i]);
      formData.append("files", filesList[i]);
    }

    const headers = new HttpHeaders().set("Accept", "application/json");
    return this.http
      .post(`${this.baseUrl}`, formData, {
        headers: headers,
        reportProgress: true,
        observe: "events"
      })
      .map(response => response || {})
      .catch((error: HttpErrorResponse) => {
        console.error("observable error: ", error);
        return Observable.throw(error.statusText);
      });
  }
}
