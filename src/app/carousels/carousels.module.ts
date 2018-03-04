import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { CustomPipeModule } from "app/custom-pipe/custom-pipe.module";
import { FroalaViewModule } from "angular-froala-wysiwyg";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarouselsListComponent } from "./carousels-list/carousels-list.component";
import { CarouselsService } from "./carousels.service";
import { DpDatePickerModule } from "ng2-jalali-date-picker";
import { FormsModule } from "@angular/forms";
import { PaginationModule } from "ngx-bootstrap/pagination/pagination.module";
import { CarouselWidgetComponent } from "./carousel-widget/carousel-widget.component";

@NgModule({
  imports: [
    CommonModule,
    DpDatePickerModule,
    FroalaViewModule.forRoot(),
    CustomPipeModule,
    FormsModule,
    PaginationModule.forRoot(),
    SharedModule,
    RouterModule
  ],
  exports: [CarouselWidgetComponent],
  declarations: [CarouselsListComponent, CarouselWidgetComponent],
  providers: [CarouselsService]
})
export class CarouselsModule {}
