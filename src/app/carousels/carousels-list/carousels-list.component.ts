import { CarouselsService } from "./../carousels.service";
import { Carousel } from "./../models/carousels";

import { GridColumn } from "./../../simple-grid/grid-column";
import { AppProduct } from "./../../simple-grid/app-product";
import { PagedQueryResult } from "./../../simple-grid/paged-query-result";
import { PagedQueryModel } from "./../../simple-grid/paged-query-model";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ToastyService, ToastOptions } from "ng2-toasty";
import * as moment from "jalali-moment";

@Component({
  selector: "app-carousels-list",
  templateUrl: "./carousels-list.component.html",
  styleUrls: ["./carousels-list.component.css"]
})
export class CarouselsListComponent implements OnInit {
  itemsPerPage = [10, 15, 20, 25, 30, 40, 50, 100];
  numberOfPages: number;
  isLoading = false;
  // dateTest = moment("1367/11/04","jYYYY/jMM/jD");
  dateTest = moment("2017-11-30T20:30:00Z").locale("fa");
  queryModel = new PagedQueryModel("ID", true, 1, 10, "", "");
  queryResult = new PagedQueryResult<Carousel>(0, []);
  columns: GridColumn[] = [
    new GridColumn("ID", "ID", true),
    new GridColumn("StartDate", "StartDate", true),
    new GridColumn("ExpireDate", "ExpireDate", true),
    new GridColumn("ImageSrc", "ImageSrc", true),
    new GridColumn("Title", "Title", true),
    new GridColumn("Link", "Link", true),
    new GridColumn("IsActive", "IsActive", true)
  ];

  @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
  @ViewChild("editTemplate") editTemplate: TemplateRef<any>;
  selectedItem: Carousel;
  isNewRecord: boolean;

  constructor(
    private service: CarouselsService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.getPagedList();
  }
  private getPagedList() {
    this.isLoading = true;
    this.service.getPagedList(this.queryModel).subscribe(result => {
      this.queryResult = result;
      this.queryResult.items.forEach(
        x =>{
          x.StartDate = moment(`${x.StartDate}`).locale("fa");
          x.ExpireDate = moment(`${x.ExpireDate}`).locale("fa");
         } );

      this.isLoading = false;
    });
  }

  onPageChange(event: any) {
    this.queryModel.page = event.page;
    this.getPagedList();
  }

  sortBy(columnName) {
    if (this.queryModel.sortBy === columnName) {
      this.queryModel.isAscending = !this.queryModel.isAscending;
    } else {
      this.queryModel.sortBy = columnName;
      this.queryModel.isAscending = true;
    }
    this.getPagedList();
  }

  editItem(item: Carousel) {
    console.log(item);
    this.selectedItem = item;
  }

  deleteItem(item: Carousel) {
    console.log(item);
    this.service.delete(item.ID).subscribe(response => {
      this.toastyService.success(<ToastOptions>{
        title: "Success!",
        msg: `${item.ID} has been deleted!`,
        theme: "bootstrap",
        showClose: true,
        timeout: 15000
      });
      this.getPagedList();
    });
  }

  saveItem() {
    console.log(this.selectedItem);
    if (this.isNewRecord) {
      this.service.add(this.selectedItem).subscribe((resp: Carousel) => {
        this.selectedItem.ID = resp.ID;

        this.toastyService.success(<ToastOptions>{
          title: "Success!",
          msg: `${this.selectedItem.ID} has been added!`,
          theme: "bootstrap",
          showClose: true,
          timeout: 15000
        });

        this.isNewRecord = false;
        this.selectedItem = null;
      });
    } else {
      this.service
        .update(this.selectedItem.ID, this.selectedItem)
        .subscribe((resp: Carousel) => {
          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.selectedItem.ID} has been updated!`,
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
    this.getPagedList();
  }

  addItem() {
    this.selectedItem = new Carousel();
    console.log(new Date());
    this.isNewRecord = true;

    this.queryResult.items.push(this.selectedItem);
    this.queryResult.totalItems++;
  }

  loadTemplate(item: Carousel) {
    if (this.selectedItem && this.selectedItem.ID === item.ID) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  doFilter() {
    this.queryModel.page = 1;
    this.getPagedList();
  }

  resetFilter() {
    this.queryModel.page = 1;
    this.queryModel.filterByColumn = "";
    this.queryModel.filterByValue = "";
    this.getPagedList();
  }

  resetPageSize() {
    this.queryModel.page = 1;
    this.getPagedList();
  }
}
