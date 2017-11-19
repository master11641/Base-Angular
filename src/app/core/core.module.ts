import { AccountModule } from './../account/account.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,

  ],
  exports: [SideBarComponent, HeaderComponent, FooterComponent],
  declarations: [SideBarComponent, HeaderComponent, FooterComponent]
})
export class CoreModule { }
