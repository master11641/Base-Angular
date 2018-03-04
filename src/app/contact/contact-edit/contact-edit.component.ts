import { ToastyService, ToastOptions } from "ng2-toasty";
import { AuthService } from "./../../core/services/auth.service";
import { ContactService } from "./../contact.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Contact } from "app/contact/contact";
import { concat } from "rxjs/operators/concat";

@Component({
  selector: "app-contact-edit",
  templateUrl: "./contact-edit.component.html",
  styleUrls: ["./contact-edit.component.css"]
})
export class ContactEditComponent implements OnInit {
  id: number;
  Contact: Contact;
  parentContact: Contact;
  replyId = 0;
  isNewRecord = false;
  isAdminPage: boolean;
  contactType = 0;
  constructor(
    private Service: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    if (this.router.url.indexOf("admin") >= 0) {
      this.isAdminPage = true;
    } else {
      this.isAdminPage = false;
    }
    this.Contact = new Contact();
    this.route.params.subscribe(data => {
      if (data["contacttype"]) {
        this.contactType = +data["contacttype"];
      }
      if (data["replyid"]) {
        this.replyId = +data["replyid"];
        this.isNewRecord = true;
        if (+this.replyId !== 0) {
          this.route.params.subscribe(param => {
            this.id = +param["id"];
            this.Service.getById(this.id).subscribe(x => {
              this.parentContact = x;
            });
          });
        }
      } else {
        this.route.params.subscribe(param => {
          this.id = +param["id"];
          this.Service.getById(this.id).subscribe(x => {
            this.Contact = x;
          });
        });
      }
    });
    if (
      this.id !== undefined &&
      this.id !== 0 &&
      this.replyId === 0 &&
      this.isAdminPage
    ) {
      // alert(this.id);
      // console.log(this.id);
      this.Service.setReadComment(this.id).subscribe();
    }
  }
  submitForm() {
    if (this.isAdminPage) {
      if (this.isNewRecord) {
        this.Contact.FullName = "مدیریت";
        if (this.replyId !== 0) {
          this.Contact.ContactId = +this.replyId;
        }
        this.Contact.IsConfirm = true;
        this.Contact.IsShow = true;
        this.Contact.IsRead=true;
        this.Service.addAppProduct(this.Contact).subscribe(x => {
          this.router.navigateByUrl("/admin/contacts");
        });
      } else {
        this.Service.updateAppProduct(this.Contact.ID, this.Contact).subscribe(
          x => {
            this.router.navigateByUrl("/admin/contacts");
          }
        );
      }
    } else {
      if (this.isNewRecord) {
        this.Contact.ContactType = +this.contactType;
        this.Contact.FullName = this.authService.getAuthUser().userName;
        if (this.replyId !== 0) {
          this.Contact.ContactId = +this.replyId;
        }
        this.Service.addAppProduct(this.Contact).subscribe(x => {
          if (this.contactType !== 0) {
            this.router.navigateByUrl("/");
          } else {
            this.router.navigateByUrl("/pages/contactus");
          }
          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `پیام شما با موفقیت ثبت شد`,
            theme: "bootstrap",
            showClose: true,
            timeout: 15000
          });
        });
      } else {
        this.Service.updateAppProduct(this.Contact.ID, this.Contact).subscribe(
          x => {
            this.router.navigateByUrl("/pages/contactus");
          }
        );
      }
    }
  }
}
