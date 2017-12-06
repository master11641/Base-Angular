import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { CustomPipeModule } from "./../custom-pipe/custom-pipe.module";
import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SimpleGridRoutingModule } from "./simple-grid-routing.module";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductsListService } from "./products-list.service";

import { PaginationModule } from "ngx-bootstrap";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    DpDatePickerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    CustomPipeModule,
    FormsModule,
    PaginationModule.forRoot(),
    SimpleGridRoutingModule,
    SharedModule

  ],
  declarations: [ProductsListComponent],
  providers: [ProductsListService]
})
export class SimpleGridModule {}
