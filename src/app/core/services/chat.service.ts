import { AppConfig } from "./../app-config.service";
import { AppConfigService } from "app/core/app-config.service";
import { Message } from "./chat.service";
import { WebsocketService } from "app/core/services/websocket.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
let CHAT_URL = "/api/chat";

export interface Message {
  From: string;
  To: string;
  MessageBody: string;
  SendDate: any;
}

@Injectable()
export class ChatService {
  public messages: Subject<Message>;
  private IsConnect = new BehaviorSubject<boolean>(false);
  IsConnect$ = this.IsConnect.asObservable();
  constructor(wsService: WebsocketService, private config: AppConfigService) {
    CHAT_URL = this.config.configuration.chatWebSocketEndPoint + CHAT_URL;
    wsService.IsConnect$.subscribe(x => {
      this.IsConnect.next(x);
    });
    this.messages = <Subject<Message>>wsService
      .connect(CHAT_URL)
      .map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          From: data.From,
          To: data.To,
          MessageBody: data.MessageBody,
          SendDate: data.SendDate
        };
      });
  }
}
