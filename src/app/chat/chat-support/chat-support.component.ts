import { AuthService } from "./../../core/services/auth.service";
import { ChatOperationsService } from "./../chat-operations.service";
import { Message } from "./../../core/services/chat.service";
import { WebsocketService } from "app/core/services/websocket.service";
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { ChatService } from "app/core/services/chat.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

declare var jquery: any;
declare var $: any;
@Component({
  selector: "app-chat-support",
  templateUrl: "./chat-support.component.html",
  styleUrls: ["./chat-support.component.css"]
})
export class ChatSupportComponent implements OnInit, OnDestroy, AfterViewInit {
  popupOn = false;
  Messages = new Array<Message>();
  IsConnected: boolean;
  sampleSubscription: Subscription;
  personInChat = new Array<string>();
  onlineUsers = new Array<string>();
  isLoggedIn = false;
  userName: string;
  adminSupportName: string;
  public Message = {
    From: "",
    To: "",
    MessageBody: "سلام ",
    SendDate: new Date()
  };
  constructor(
    private chatService: ChatService,
    private cService: ChatOperationsService,
    private authService: AuthService
  ) {}
  sendMsg(msg: Message) {
    msg.SendDate = new Date();
    this.chatService.messages.next(msg);
    this.Messages.push({
      From: msg.From,
      To: msg.To,
      MessageBody: msg.MessageBody,
      SendDate: new Date()
    });
  }
  ngOnInit() {
    this.userName = this.authService.getAuthUser().userName;

    this.chatService.messages.subscribe(msg => {
      this.Messages.push(msg);
      if (!this.personInChat) {
        this.personInChat = new Array<string>();
      }
      if (this.personInChat.filter(x => x === msg.From).length === 0) {
        this.personInChat.push(msg.From);
      }
      if (
        this.Messages.filter(x => x.From === msg.From && x.To === msg.To)
          .length === 1
      ) {
        this.playAudio();
      }
      console.log(this.personInChat);
    });
    this.IsConnected = false;
    this.Message.From = this.authService.getAuthUser().userName;
    this.Message.To = this.Message.From;
    Observable.interval(60).subscribe(x => {
      if (this.IsConnected === false) {
        this.Message.To = this.Message.From;
       //this.submitForm();
        this.chatService.messages.next(this.Message);
      }
    });

    this.sampleSubscription = this.chatService.IsConnect$.subscribe(x => {
      this.IsConnected = x;
    });
    this.cService.getAdminConnectedUser().subscribe(x => {
      this.onlineUsers = x.filter(x => x !== this.userName);
      this.adminSupportName = this.onlineUsers[0];
    });
  }
  ngAfterViewInit() {}
  showpopUp(value: boolean) {
    this.popupOn = value;
  }
  submitForm() {
    this.Message.To = this.adminSupportName;
    if (
      this.personInChat.filter(x => x === this.Message.To).length === 0 &&
      this.Message.From !== this.Message.To
    ) {
      this.personInChat = new Array<string>();
      this.personInChat.push(this.Message.To);
      // alert(this.Message.To);
    }
    // alert(this.Message.To);
    this.chatService.messages.next(this.Message);
  }

  filterChatsByPersonInChat(person: string): Message[] {
    return this.Messages.filter(x => x.From === person || x.To === person);
  }
  playAudio() {
    const audio = new Audio();
    audio.src = "/assets/sounds/button-09.wav";
    audio.load();
    audio.volume = 1;
    audio.play();
  }
  ngOnDestroy() {
    this.chatService.messages.unsubscribe();
    this.IsConnected = false;
  }
}
