import { SharedModule } from '../shared/shared.module';
import { FormsModule } from "@angular/forms";
import { CustomPipeModule } from "../custom-pipe/custom-pipe.module";
import { FroalaViewModule } from "angular-froala-wysiwyg";
import { FroalaEditorModule } from "angular-froala-wysiwyg";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductCategoryRoutingModule } from "./product-category-routing.module";
import { ProductCategoryListComponent } from "./product-category-list/product-category-list.component";
import { ProductCategoryService } from "./product-category.service";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { PaginationModule } from "ngx-bootstrap/pagination/pagination.module";

@NgModule({
  imports: [
    CommonModule,
    ProductCategoryRoutingModule,
    DpDatePickerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    CustomPipeModule,
    FormsModule,
    PaginationModule.forRoot(),
    SharedModule
  ],
  declarations: [ProductCategoryListComponent],
  providers: [ProductCategoryService]
})
export class ProductCategoryModule {}
