import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ProductsListService } from "./../products-list.service";
import { PagedQueryModel } from "./../paged-query-model";
import { PagedQueryResult } from "./../paged-query-result";
import { AppProduct } from "./../app-product";
import { GridColumn } from "./../grid-column";

import { ToastyService, ToastOptions } from "ng2-toasty";
import * as moment from "jalali-moment";
@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.css"]
})
export class ProductsListComponent implements OnInit {
  itemsPerPage = [10, 15, 20, 25, 30, 40, 50, 100];
  numberOfPages: number;
  isLoading = false;
  // dateTest = moment("1367/11/04","jYYYY/jMM/jD");
  dateTest = moment("2017-11-30T20:30:00Z").locale('fa');
  queryModel = new PagedQueryModel("productId", true, 1, 10, "", "");
  queryResult = new PagedQueryResult<AppProduct>(0, []);
  columns: GridColumn[] = [
    new GridColumn("شناسه", "productId", true),
    new GridColumn("عنوان محصول", "productName", true),
    new GridColumn("قیمت", "price", true),
    new GridColumn("وضعیت", "isAvailable", false),
    new GridColumn("شرح کالا", "Description", false),
    new GridColumn("تاریخ", "ShowFromDate", false)
  ];

  @ViewChild("readOnlyTemplate") readOnlyTemplate: TemplateRef<any>;
  @ViewChild("editTemplate") editTemplate: TemplateRef<any>;
  selectedItem: AppProduct;
  isNewRecord: boolean;

  constructor(
    private productsService: ProductsListService,
    private toastyService: ToastyService
  ) {}

  ngOnInit() {
    this.getPagedProductsList();
  }

  private getPagedProductsList() {
    this.isLoading = true;
    this.productsService
      .getPagedProductsList(this.queryModel)
      .subscribe(result => {
        this.queryResult = result;
        this.queryResult.items.forEach(x=>x.ShowFromDate=moment(`${x.ShowFromDate}`).locale("fa"));
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

  editItem(item: AppProduct) {
    console.log(item);
    this.selectedItem = item;
  }

  deleteItem(item: AppProduct) {
    console.log(item);
    this.productsService
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

    this.selectedItem.Price = +this.selectedItem.Price;
    console.log(this.selectedItem);
    if (this.isNewRecord) {
      this.productsService
        .addAppProduct(this.selectedItem)
        .subscribe((resp: AppProduct) => {
          this.selectedItem.ProductId = resp.ProductId;

          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.selectedItem.ProductName} has been added!`,
            theme: "bootstrap",
            showClose: true,
            timeout: 15000
          });

          this.isNewRecord = false;
          this.selectedItem = null;
        });
    } else {
      this.productsService
        .updateAppProduct(this.selectedItem.ProductId, this.selectedItem)
        .subscribe((resp: AppProduct) => {
          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.selectedItem.ProductName} has been updated!`,
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
    this.selectedItem = new AppProduct(0, "", 0, false, "", moment(new Date()).locale("fa"),1);
    console.log(new Date());
    this.isNewRecord = true;

    this.queryResult.items.push(this.selectedItem);
    this.queryResult.totalItems++;
  }

  loadTemplate(item: AppProduct) {
    if (this.selectedItem && this.selectedItem.ProductId === item.ProductId) {
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
