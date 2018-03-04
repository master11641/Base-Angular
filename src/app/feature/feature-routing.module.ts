
import { ChatComponent } from "./../chat/chat/chat.component";
import { ContactWidgetComponent } from "./../contact/contact-widget/contact-widget.component";
import { ContactListComponent } from "./../contact/contact-list/contact-list.component";
import { CarouselWidgetComponent } from "./../carousels/carousel-widget/carousel-widget.component";

import { DashboardComponent } from "./../dashboard/dashboard/dashboard.component";


import { RoleslistComponent } from "./../roles/roleslist/roleslist.component";
import { AccessDeniedComponent } from "./../authentication/access-denied/access-denied.component";
import { UserslistComponent } from "./../user-operations/userslist/userslist.component";

import { ModalDialogComponent } from "./../modal-dialog/modal-dialog.component";
import { UploadFileSimpleComponent } from "../upload-file/upload-file-simple/upload-file-simple.component";
import { UploadFileWithProgressBarComponent } from "../upload-file/upload-file-with-progress-bar/upload-file-with-progress-bar.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { ProductsComponent } from "./pages/admin/products/products.component";
import { DefaultComponent } from "./pages/home/default/default.component";
import { PageLayoutComponent } from "./layouts/page-layout/page-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./pages/home/page-not-found/page-not-found.component";

import { LoginComponent } from "../authentication/login/login.component";

import { AuthGuardPermission } from "app/core/models/auth-guard-permission";
import { AuthGuard } from "app/core/services/auth.guard";



import { CarouselsListComponent } from "app/carousels/carousels-list/carousels-list.component";
import { ContactEditComponent } from "app/contact/contact-edit/contact-edit.component";
import { ChatSupportComponent } from "app/chat/chat-support/chat-support.component";

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
      { path: "simpleModal", component: ModalDialogComponent },

      { path: "login", component: LoginComponent },
      { path: "accessDenied", component: AccessDeniedComponent },


      { path: "carousels", component: CarouselWidgetComponent },
      { path: "contactus", component: ContactWidgetComponent },
      {
        path: "contact/:id",
        component: ContactEditComponent,
        canActivate: [AuthGuard]
      },
      { path: "chat", component: ChatComponent },
      { path: "chatsupport", component: ChatSupportComponent , canActivate: [AuthGuard]},
    ]
  },
  {
    path: "admin",
    component: AdminLayoutComponent,
    children: [

      { path: "users", component: UserslistComponent },
      { path: "roles", component: RoleslistComponent },

      { path: "dashboard", component: DashboardComponent },
      { path: "carousels", component: CarouselsListComponent },
      { path: "contacts", component: ContactListComponent },
      { path: "contactedit/:id", component: ContactEditComponent },

    ],
    data: {
      permission: {
        permittedRoles: ["admin"],
        deniedRoles: null
      } as AuthGuardPermission
    },
    canActivate: [AuthGuard]
  },
  { path: "", redirectTo: "pages/home", pathMatch: "full" },
  { path: "**", redirectTo: "pages/pagenotfound" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule {}
