import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FeatureRoutingModule } from "./feature-routing.module";
import { PageLayoutComponent } from "./layouts/page-layout/page-layout.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ProductsComponent } from "./pages/admin/products/products.component";
import { DefaultComponent } from './pages/home/default/default.component';
import { PageNotFoundComponent } from './pages/home/page-not-found/page-not-found.component';

@NgModule({
  imports: [CommonModule, FeatureRoutingModule],
  declarations: [
    PageLayoutComponent,    
    AdminLayoutComponent,
    ProductsComponent,
    DefaultComponent,
    PageNotFoundComponent
  ]
})
export class FeatureModule { }
