import { CustomPipeModule } from "./../custom-pipe/custom-pipe.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ChatComponent } from "./chat/chat.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChatWidgetComponent } from "./chat-widget/chat-widget.component";
import { ChatOperationsService } from "./chat-operations.service";
import { SharedModule } from "app/shared/shared.module";
import { ChatSupportComponent } from "./chat-support/chat-support.component";
import { ChatSupportPopupComponent } from "./chat-support-popup/chat-support-popup.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CustomPipeModule,
    RouterModule
  ],
  exports: [ChatComponent, ChatSupportComponent, ChatSupportPopupComponent],
  declarations: [
    ChatComponent,
    ChatWidgetComponent,
    ChatSupportComponent,
    ChatSupportPopupComponent
  ],
  providers: [ChatOperationsService]
})
export class ChatModule {}
