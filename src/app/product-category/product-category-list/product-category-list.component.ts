import { ProductCategory } from "./../product-category";
import { ProductCategoryService } from "../product-category.service";
import { GridColumn } from "./../../simple-grid/grid-column";
import { AppProduct } from "./../../simple-grid/app-product";
import { PagedQueryResult } from "./../../simple-grid/paged-query-result";
import { PagedQueryModel } from "./../../simple-grid/paged-query-model";
import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ToastyService, ToastOptions } from "ng2-toasty";
import * as moment from "jalali-moment";

@Component({
  selector: "app-product-category-list",
  templateUrl: "./product-category-list.component.html",
  styleUrls: ["./product-category-list.component.css"]
})
export class ProductCategoryListComponent implements OnInit {
  itemsPerPage = [10, 15, 20, 25, 30, 40, 50, 100];
  numberOfPages: number;
  isLoading = false;
  // dateTest = moment("1367/11/04","jYYYY/jMM/jD");
  dateTest = moment("2017-11-30T20:30:00Z").locale("fa");
  queryModel = new PagedQueryModel("productId", true, 1, 10, "", "");
  queryResult = new PagedQueryResult<ProductCategory>(0, []);
  columns: GridColumn[] = [
    new GridColumn("شناسه", "ID", true),
    new GridColumn("عنوان گروه محصول", "CategoryName", true)
  ];

  @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
  @ViewChild("editTemplate") editTemplate: TemplateRef<any>;
  selectedItem: ProductCategory;
  isNewRecord: boolean;

  constructor(
    private productCategoryService: ProductCategoryService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.getPagedProductsList();
  }
  private getPagedProductsList() {
    this.isLoading = true;
    this.productCategoryService
      .getPagedProductsList(this.queryModel)
      .subscribe(result => {
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

  editItem(item: ProductCategory) {
    console.log(item);
    this.selectedItem = item;
  }

  deleteItem(item: AppProduct) {
    console.log(item);
    this.productCategoryService
      .deleteAppProduct(item.ProductId)
      .subscribe(response => {
        this.toastyService.success(<ToastOptions>{
          title: "Success!",
          msg: `${item.ProductName} has been deleted!`,
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
        .subscribe((resp: ProductCategory) => {
          this.selectedItem.ID = resp.ID;

          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.selectedItem.CategoryName} has been added!`,
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
        .subscribe((resp: ProductCategory) => {
          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.selectedItem.CategoryName} has been updated!`,
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
    this.selectedItem = new ProductCategory(
      0,
      "",
      new AppProduct(0, "", 0, false, "", moment(new Date()).locale("fa"), 1)
    );
    console.log(new Date());
    this.isNewRecord = true;

    this.queryResult.items.push(this.selectedItem);
    this.queryResult.totalItems++;
  }

  loadTemplate(item: ProductCategory) {
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
