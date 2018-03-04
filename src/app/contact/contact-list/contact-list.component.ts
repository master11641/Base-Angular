import { Router, ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { ContactService } from "./../contact.service";
import { Contact } from "./../contact";

import { GridColumn } from "./../../simple-grid/grid-column";
import { AppProduct, ProductAttribute } from "./../../simple-grid/app-product";
import { PagedQueryResult } from "./../../simple-grid/paged-query-result";
import { PagedQueryModel } from "./../../simple-grid/paged-query-model";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ToastyService, ToastOptions } from "ng2-toasty";
import * as moment from "jalali-moment";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  replyText: string;
  itemsPerPage = [10, 15, 20, 25, 30, 40, 50, 100];
  numberOfPages: number;
  isLoading = false;
  isAdminPage :boolean;
  dateTest = moment("2017-11-30T20:30:00Z").locale("fa");
  queryModel = new PagedQueryModel("ID", true, 1, 10, "", "");
  queryResult = new PagedQueryResult<Contact>(0, []);
  columns: GridColumn[] = [
    new GridColumn("شناسه", "ID", false),
    new GridColumn("نام و نام خانوادگی", "FullName", false),
    new GridColumn("ایمیل", "Email", false),
    new GridColumn("موضوع", "Subject", false),
    new GridColumn("متن نظر", "Description", false),
    new GridColumn("نوع سوال", "ContactType", false),
  ];

  @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
  @ViewChild("editTemplate") editTemplate: TemplateRef<any>;
  selectedItem: Contact;
  isNewRecord: boolean;
  fileName: string;
  constructor(
    private productCategoryService: ContactService,
    private toastyService: ToastyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    if (this.router.url.indexOf("admin") >= 0) {
      this.isAdminPage = true;

    }else{
      this.isAdminPage =false;
    }
    this.getPagedProductsList();
  }
  private getPagedProductsList() {
    this.isLoading = true;
    if(this.isAdminPage===true){
          this.productCategoryService
      .getPagedProductsList(this.queryModel)
      .subscribe(result => {
        this.queryResult.items = result.items;

        this.queryResult.totalItems = result.totalItems;

        this.isLoading = false;
      });
    }else{
      this.productCategoryService
      .getPagedActivatedContact(this.queryModel)
      .subscribe(result => {
        this.queryResult.items = result.items;

        this.queryResult.totalItems = result.totalItems;

        this.isLoading = false;
      });
    }

  }

  onPageChange(event: any) {
    this.queryModel.page = event.page;
    this.getPagedProductsList();
  }

  sortBy(columnName) {
    if (this.queryModel.sortBy === columnName) {
      this.queryModel.isAscending = !this.queryModel.isAscending;
    } else {
      this.queryModel.sortBy = columnName;
      this.queryModel.isAscending = true;
    }
    this.getPagedProductsList();
  }

  editItem(item: Contact) {
    console.log(item);
    this.selectedItem = item;
  }

  deleteItem(item: Contact) {
    console.log(item);
    this.productCategoryService
      .deleteAppProduct(item.ID)
      .subscribe(response => {
        this.toastyService.success(<ToastOptions>{
          title: "Success!",
          msg: `${item.FullName} has been deleted!`,
          theme: "bootstrap",
          showClose: true,
          timeout: 15000
        });
        this.getPagedProductsList();
      });
  }

  saveItem() {
    console.log(this.selectedItem);
    if (this.isNewRecord) {
      this.productCategoryService
        .addAppProduct(this.selectedItem)
        .subscribe((resp: Contact) => {
          this.selectedItem.ID = resp.ID;

          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.selectedItem.Subject} has been added!`,
            theme: "bootstrap",
            showClose: true,
            timeout: 15000
          });

          this.isNewRecord = false;
          this.selectedItem = null;
        });
    } else {
      this.productCategoryService
        .updateAppProduct(this.selectedItem.ID, this.selectedItem)
        .subscribe((resp: Contact) => {
          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.selectedItem.Subject} has been updated!`,
            theme: "bootstrap",
            showClose: true,
            timeout: 15000
          });
          this.selectedItem = null;
        });
    }
  }

  cancel() {
    console.log(this.selectedItem);
    this.selectedItem = null;
  }

  addItem() {
    // this.selectedItem = new Contact();
    // console.log(new Date());
    // this.isNewRecord = true;

    // this.queryResult.items.push(this.selectedItem);
    // this.queryResult.totalItems++;
    if (this.isAdminPage) {
      this.router.navigate(["/admin/contactedit/", 0, { replyid: 0 }]);
    } else {
      this.router.navigate(["/pages/contact/", 0, { replyid: 0 }]);
    }
  }

  loadTemplate(item: Contact) {
    if (this.selectedItem && this.selectedItem.ID === item.ID) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
  confirm(item: Contact) {
    this.getPagedProductsList();
    // alert(item.ID);
    // this.productCategoryService.confirmComment(item.ID).subscribe(res => {
    //   this.getPagedProductsList();
    // });
  }
  doFilter() {
    this.queryModel.page = 1;
    this.getPagedProductsList();
  }

  resetFilter() {
    this.queryModel.page = 1;
    this.queryModel.filterByColumn = "";
    this.queryModel.filterByValue = "";
    this.getPagedProductsList();
  }

  resetPageSize() {
    this.queryModel.page = 1;
    this.getPagedProductsList();
  }
filterByContctType(value:string){
  this.queryModel.filterByColumn = "ContactType";
  this.queryModel.filterByValue = `${value}`;
  this.doFilter();
}
filterByReadStatus(value:number){
  this.queryModel.filterByColumn = "IsRead";
  this.queryModel.filterByValue = `${value}`;
  this.doFilter();
}

  sendReply() {
    const newComment: Contact = {
      ID: 0,
      FullName: "مدیریت ",
      Email: "",
      Subject: "پاسخ",
      Description: this.replyText,
      ContactId: this.selectedItem.ID,
      IsShow: true,
      IsRead: true,
      IsConfirm: true,
      Replies: new Array<Contact>(),
      IsEmailSend: false,
      CreatedAt: "",
      ContactType: 0
    };
    this.productCategoryService
      .addAppProduct(newComment)
      .subscribe((resp: Contact) => {
        this.selectedItem.ID = resp.ID;

        this.toastyService.success(<ToastOptions>{
          title: "Success!",
          msg: `${newComment.Subject} has been added!`,
          theme: "bootstrap",
          showClose: true,
          timeout: 15000
        });
        this.isNewRecord = false;
        this.selectedItem = null;
        this.getPagedProductsList();
      });
  }
}
