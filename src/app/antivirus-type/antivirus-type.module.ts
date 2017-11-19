import { AntiVirusTypeRoutingModule } from './antivirus-type-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxConfirmModule} from 'ngx-confirm/ngx-confirm.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AntivirusTypeAddComponent } from './antivirus-type-add/antivirus-type-add.component';
import { AntivirusTypeEditComponent } from './antivirus-type-edit/antivirus-type-edit.component';
import { AntivirusTypeListComponent } from './antivirus-type-list/antivirus-type-list.component';
import { AntivirusTypeService } from './antivirus-type.service';

@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    AntiVirusTypeRoutingModule,
    NgxConfirmModule,
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AntivirusTypeAddComponent, AntivirusTypeEditComponent, AntivirusTypeListComponent],
  providers: [AntivirusTypeService]
})
export class AntivirusTypeModule { }
