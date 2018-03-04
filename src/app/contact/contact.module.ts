import { CustomPipeModule } from "./../custom-pipe/custom-pipe.module";
import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContactService } from "./contact.service";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { PaginationModule } from "ngx-bootstrap/pagination/pagination.module";
import { FormsModule } from "@angular/forms";
import { ContactWidgetComponent } from "./contact-widget/contact-widget.component";
import { MediaComponent } from "./media/media.component";
import { ContactEditComponent } from './contact-edit/contact-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CustomPipeModule,
    FormsModule,
    PaginationModule.forRoot(),
    SharedModule,
    CustomPipeModule
  ],
  declarations: [ContactListComponent, ContactWidgetComponent, MediaComponent, ContactEditComponent],
  providers: [ContactService]
})
export class ContactModule {}
