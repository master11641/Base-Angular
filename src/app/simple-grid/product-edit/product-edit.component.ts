import { ProductImage } from './../product-image';
import { ProductsListService } from "../products-list.service";
import { ToastyService, ToastOptions } from "ng2-toasty";

import { AppProduct } from "./../app-product";
import { Component, OnInit, Input, Output, EventEmitter, ViewChild  } from "@angular/core";

declare var jquery: any;
declare var $: any;
import * as moment from "jalali-moment";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.css"]
})
export class ProductEditComponent implements OnInit {
  @Input() AppProduct: AppProduct;
  @Input() isNewRecord: boolean;
  @Output() dataBind = new EventEmitter();
fileName:string;
  fileNames: Array<string>;
  constructor(
    private productsService: ProductsListService,
    private toastyService: ToastyService
  ) {
    this.fileNames = new Array<string>();
    this.AppProduct = new AppProduct(
      0,
      "",
      0,
      false,
      "",
      moment("2017-11-30T20:30:00Z").locale('fa'),
      1,
      new Array<ProductImage>()
    );
  }

  ngOnInit() {}
  saveItem() {
    this.AppProduct.Price = +this.AppProduct.Price;
      if (this.isNewRecord) {
      this.productsService
        .addAppProduct(this.AppProduct)
        .subscribe((resp: AppProduct) => {
          this.AppProduct.ProductId = resp.ProductId;

          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.AppProduct.ProductName} has been added!`,
            theme: "bootstrap",
            showClose: true,
            timeout: 15000
          });
       this.dataBind.emit();
          this.isNewRecord = false;
        });
    } else {
      this.productsService
        .updateAppProduct(this.AppProduct.ProductId, this.AppProduct)
        .subscribe((resp: AppProduct) => {
          this.toastyService.success(<ToastOptions>{
            title: "Success!",
            msg: `${this.AppProduct.ProductName} has been updated!`,
            theme: "bootstrap",
            showClose: true,
            timeout: 15000
          });
          this.dataBind.emit();

        });
        $('.nav-tabs a[href="#home"]').tab('show');
    }
  }
  fileUploadComponent(){

    if (!this.AppProduct.ProductImages) {
      this.AppProduct.ProductImages = new Array<ProductImage>();
    }
      const pi = new ProductImage();
      pi.ID = 0;
      pi.ImageUrl =this.fileName;
      pi.ProductId = this.AppProduct.ProductId;
      this.AppProduct.ProductImages.push(pi);

  }
}
