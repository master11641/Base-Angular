import { ChatModule } from "./../chat/chat.module";
import { SharedModule } from "app/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FeatureRoutingModule } from "./feature-routing.module";
import { PageLayoutComponent } from "./layouts/page-layout/page-layout.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { DefaultComponent } from "./pages/home/default/default.component";
import { PageNotFoundComponent } from "./pages/home/page-not-found/page-not-found.component";
import { CarouselsModule } from "app/carousels/carousels.module";

@NgModule({
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedModule,
    CarouselsModule,
    ChatModule
  ],
  declarations: [
    PageLayoutComponent,
    AdminLayoutComponent,
    DefaultComponent,
    PageNotFoundComponent
  ]
})
export class FeatureModule {}
