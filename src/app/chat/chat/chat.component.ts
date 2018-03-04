import { AuthService } from "./../../core/services/auth.service";
import { ChatOperationsService } from "./../chat-operations.service";
import { Message } from "./../../core/services/chat.service";
import { WebsocketService } from "app/core/services/websocket.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { ChatService } from "app/core/services/chat.service";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit, AfterViewInit {
  popupOn = false;
  Messages = new Array<Message>();
  IsConnected: boolean;
  sampleSubscription: Subscription;
  personInChat = new Array<string>();
  onlineUsers = new Array<string>();
  @ViewChild("audioOption") audioPlayerRef: ElementRef;

  public Message = {
    From: "",
    To: "",
    MessageBody: "سلام ",
    SendDate:new Date()
  };
  constructor(
    private chatService: ChatService,
    private cService: ChatOperationsService,
    private authService: AuthService
  ) {
    chatService.messages.subscribe(msg => {
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
  }
  sendMsg(msg: Message) {
    msg.SendDate=new Date();
    this.chatService.messages.next(msg);
    this.Messages.push({
      From: msg.From,
      To: msg.To,
      MessageBody: msg.MessageBody,
      SendDate:new Date()
    });
  }
  ngOnInit() {
    this.Message.From = this.authService.getAuthUser().userName;
    this.Message.To = this.Message.From;

    //console.log(this.Message);

    // this.chatService.messages.next(this.Message);
    this.sampleSubscription = this.chatService.IsConnect$.subscribe(x => {
      this.IsConnected = x;
    });
    this.cService.getAllConnectedUser().subscribe(x => {
      this.onlineUsers = x;
    });
  }
  ngAfterViewInit() {
    Observable.interval(60).subscribe(x => {
      if (this.IsConnected === false) {
        this.Message.To = this.Message.From;
        this.submitForm();
      }
    });
  }
  showpopUp(value: boolean) {
    this.popupOn = value;
  }
  submitForm() {
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
}
