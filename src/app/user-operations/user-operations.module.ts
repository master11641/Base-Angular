import { PaginationModule } from "ngx-bootstrap/pagination/pagination.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserOperationsRoutingModule } from "./user-operations-routing.module";
import { UserslistComponent } from "./userslist/userslist.component";
import { UserslistService } from "./userslist.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RoleManageComponent } from './role-manage/role-manage.component'; // this is needed!
@NgModule({
  imports: [
    CommonModule,
    UserOperationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TagInputModule, BrowserAnimationsModule
  ],
  declarations: [UserslistComponent, RoleManageComponent],
  providers: [UserslistService]
})
export class UserOperationsModule {}
