import { Role } from "./../../user-operations/Models/Role.";
import { RolesService } from "./../roles.service";
import { GridColumn } from "./../../simple-grid/grid-column";
import { AppProduct } from "./../../simple-grid/app-product";
import { PagedQueryResult } from "./../../simple-grid/paged-query-result";
import { PagedQueryModel } from "./../../simple-grid/paged-query-model";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ToastyService, ToastOptions } from "ng2-toasty";
import * as moment from "jalali-moment";

@Component({
  selector: "app-roleslistlist",
  templateUrl: "./roleslist.component.html",
  styleUrls: ["./roleslist.component.css"]
})
export class RoleslistComponent implements OnInit {
  itemsPerPage = [10, 15, 20, 25, 30, 40, 50, 100];
  numberOfPages: number;
  isLoading = false;
  // dateTest = moment("1367/11/04","jYYYY/jMM/jD");
  dateTest = moment("2017-11-30T20:30:00Z").locale("fa");
  queryModel = new PagedQueryModel("ID", true, 1, 10, "", "");
  queryResult = new PagedQueryResult<Role>(0, []);
  columns: GridColumn[] = [

  new GridColumn("ID", "ID", true),


  new GridColumn("Name", "Name", true),


  ];

  @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
  @ViewChild("editTemplate") editTemplate: TemplateRef<any>;
  selectedItem: Role;
  isNewRecord: boolean;

  constructor(
    private service: RolesService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.getPagedList();
  }
  private getPagedList() {
    this.isLoading = true;
    this.service
      .getPagedList(this.queryModel)
      .subscribe(result => {
        this.queryResult = result;
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

  editItem(item: Role) {
    console.log(item);
    this.selectedItem = item;
  }

  deleteItem(item: Role) {
    console.log(item);
    this.service
      .delete(item.ID)
      .subscribe(response => {
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
      this.service
        .add(this.selectedItem)
        .subscribe((resp: Role) => {
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
        .subscribe((resp: Role) => {
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
  }

  addItem() {
    this.selectedItem = new Role();
    console.log(new Date());
    this.isNewRecord = true;

    this.queryResult.items.push(this.selectedItem);
    this.queryResult.totalItems++;
  }

  loadTemplate(item: Role) {
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
