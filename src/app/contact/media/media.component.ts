import { Router } from "@angular/router";
import { ContactService } from "./../contact.service";

import { Contact } from "./../contact";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Comment } from "@angular/compiler";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.css"]
})
export class MediaComponent implements OnInit {
  @Input() Comment: Contact;
  @Output() ConfirmSubmitted = new EventEmitter();
  isAdminPage :boolean;
  constructor(private Service: ContactService, private router: Router) {}
  ngOnInit() {
    if (this.router.url.indexOf("/admin/contacts") >= 0) {
      this.isAdminPage = true;
    } else {
      this.isAdminPage = false;
    }
    console.log(this.Comment);
  }
  // confirmClicked(item: Contact) {
  //   console.log(item);
  //   alert(item.ID);
  //   this.ConfirmSubmitted.emit(item);
  // }

  confirmClicked(item: Contact) {
    this.router.navigate(["/admin/contactedit/", item.ID]);
  }
  reply(item: Contact) {
    if(this.isAdminPage){
         this.router.navigate([
      "/admin/contactedit/",
      item.ID,
      { replyid: item.ID }
    ]);
    }else{
      this.router.navigate([
        "/pages/contact/",
        item.ID,
        { replyid: item.ID }
      ]);
    }

  }
}
