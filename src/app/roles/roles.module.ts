import { PaginationModule } from "ngx-bootstrap/pagination/pagination.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RolesRoutingModule } from "./roles-routing.module";
import { RoleslistComponent } from "./roleslist/roleslist.component";
import { RolesService } from "./roles.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule.forRoot()
  ],
  declarations: [RoleslistComponent],
  providers: [RolesService]
})
export class RolesModule {}
