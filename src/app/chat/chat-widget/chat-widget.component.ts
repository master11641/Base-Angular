import { Message } from "./../../core/services/chat.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-chat-widget",
  templateUrl: "./chat-widget.component.html",
  styleUrls: ["./chat-widget.component.css"]
})
export class ChatWidgetComponent implements OnInit {
  @Input() From: string;
  @Input() To: string;
  MessageBody: string;
  @Output() SendMsgHandler = new EventEmitter<Message>();
  constructor() {}
  sendMsg() {

    // alert(this.MessageBody);
    // alert(this.To);
    const msg = {
      From: this.From,
      To: this.To,
      MessageBody: this.MessageBody,
      SendDate:new Date()
    };
    this.SendMsgHandler.emit(msg);
    this.MessageBody="";
  }
  ngOnInit() {}
}
