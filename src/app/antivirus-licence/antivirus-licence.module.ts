import { AntivirusLicenceForSaleComponent } from './antivirus-licence-for-sale/antivirus-licence-for-sale.component';
import { AntivirusLicenceEditComponent } from './antivirus-licence-edit/antivirus-licence-edit.component';
import { AntivirusLicenceAddComponent } from './antivirus-licence-add/antivirus-licence-add.component';
import { AntivirusLicenceService } from './antivirus-licence.service';
import { AntivirusLicenceListComponent } from './antivirus-licence-list/antivirus-licence-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AntivirusLicenceListComponent, AntivirusLicenceAddComponent, AntivirusLicenceEditComponent,
    AntivirusLicenceForSaleComponent],
  providers: [AntivirusLicenceService]
})
export class AntivirusLicenceModule { }
