import { RolesService } from "./../../roles/roles.service";
import { UserslistService } from "./../userslist.service";
import { User } from "./../Models/User";

// import { ProductCategory } from "./../product-category";
// import { ProductCategoryService } from "../product-category.service";
import { GridColumn } from "./../../simple-grid/grid-column";
import { AppProduct } from "./../../simple-grid/app-product";
import { PagedQueryResult } from "./../../simple-grid/paged-query-result";
import { PagedQueryModel } from "./../../simple-grid/paged-query-model";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ToastyService, ToastOptions } from "ng2-toasty";
import * as moment from "jalali-moment";
import { Role } from "app/user-operations/Models/Role.";

@Component({
  selector: "app-userslist",
  templateUrl: "./userslist.component.html",
  styleUrls: ["./userslist.component.css"]
})
export class UserslistComponent implements OnInit {
  itemsPerPage = [10, 15, 20, 25, 30, 40, 50, 100];
  numberOfPages: number;
  isLoading = false;
  // dateTest = moment("1367/11/04","jYYYY/jMM/jD");
  dateTest = moment("2017-11-30T20:30:00Z").locale("fa");
  queryModel = new PagedQueryModel("ID", true, 1, 10, "", "");
  queryResult = new PagedQueryResult<User>(0, []);
  columns: GridColumn[] = [
    new GridColumn("شناسه", "ID", true),

    new GridColumn("نام و نام خانوادگی", "FullName", true),

    new GridColumn("ایمیل", "Email", true),

    new GridColumn("پسورد", "Password", true)
  ];

  @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
  @ViewChild("editTemplate") editTemplate: TemplateRef<any>;
  selectedItem: User;
  isNewRecord: boolean;
  allRoles : Role[];
  constructor(
    private service: UserslistService,
    private toastyService: ToastyService,
    private roleService: RolesService
  ) {}

  ngOnInit() {
    this.getPagedProductsList();
    this.roleService
      .getPagedList(new PagedQueryModel("", true, 1, 100, "", ""))
      .subscribe(res => {
        this.allRoles = res.items;
      });
  }
  private getPagedProductsList() {
    this.isLoading = true;
    this.service.getPagedList(this.queryModel).subscribe(result => {
      this.queryResult = result;
      this.isLoading = false;
    });
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

  editItem(item: User) {
    console.log(item);
    this.selectedItem = item;
  }

  deleteItem(item: User) {
    console.log(item);
    this.service.delete(item.ID).subscribe(response => {
      this.toastyService.success(<ToastOptions>{
        title: "Success!",
        msg: `${item.ID} has been deleted!`,
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
      this.service.add(this.selectedItem).subscribe((resp: User) => {
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
        .subscribe((resp: User) => {
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
    this.selectedItem = new User();
    console.log(new Date());
    this.isNewRecord = true;

    this.queryResult.items.push(this.selectedItem);
    this.queryResult.totalItems++;
  }

  loadTemplate(item: User) {
    if (this.selectedItem && this.selectedItem.ID === item.ID) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
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
}
