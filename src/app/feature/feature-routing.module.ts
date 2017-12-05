import { ProductCategoryListComponent } from '../product-category/product-category-list/product-category-list.component';
import { ModalDialogComponent } from "./../modal-dialog/modal-dialog.component";
import { UploadFileSimpleComponent } from "../upload-file/upload-file-simple/upload-file-simple.component";
import { UploadFileWithProgressBarComponent } from "../upload-file/upload-file-with-progress-bar/upload-file-with-progress-bar.component";
import { ProductsListComponent } from "./../simple-grid/products-list/products-list.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ProductsComponent } from "./pages/admin/products/products.component";
import { DefaultComponent } from "./pages/home/default/default.component";
import { PageLayoutComponent } from "./layouts/page-layout/page-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./pages/home/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "pages",
    component: PageLayoutComponent,
    children: [
      { path: "home", component: DefaultComponent },
      { path: "pagenotfound", component: PageNotFoundComponent },
      { path: "uploadFileSimple", component: UploadFileSimpleComponent },
      {
        path: "uploadFileWithProgressBar",
        component: UploadFileWithProgressBarComponent
      },
      { path: "simpleModal", component: ModalDialogComponent }
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [
      { path: "products", component: ProductsListComponent },
  { path: "productcategories", component: ProductCategoryListComponent },
  ]

  },
  { path: "", redirectTo: "pages/home", pathMatch: "full" },
  { path: "**", redirectTo: "pages/pagenotfound" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
