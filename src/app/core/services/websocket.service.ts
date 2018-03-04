import { Injectable, Injector } from "@angular/core";
// import * as Rx from "rxjs/Rx";
import { webSocket } from "rxjs/observable/dom/webSocket";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { AuthService, AuthTokenType } from "./auth.service";
@Injectable()
export class WebsocketService {
  private subject: Subject<MessageEvent>;
  private IsConnect = new BehaviorSubject<boolean>(false);
  IsConnect$ = this.IsConnect.asObservable();
  authService = this.injector.get(AuthService);
  constructor(private injector: Injector) {}

  public connect(url): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    if(this.authService.isLoggedIn()){

         const accessToken = this.authService.getRawAuthToken(
      AuthTokenType.AccessToken
    );
    if (accessToken) {
      url += "?ticket=" + accessToken;
    }
    }

    let ws = new WebSocket(url);

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);

      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          this.IsConnect.next(true);
          ws.send(JSON.stringify(data));
        }
        if (ws.readyState === WebSocket.CLOSED) {
          this.IsConnect.next(false);
           //alert("اتصال برقرار نیست .");
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
