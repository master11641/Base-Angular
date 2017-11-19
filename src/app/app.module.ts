import { AntivirusLicenceModule } from './antivirus-licence/antivirus-licence.module';
import { AntivirusTypeModule } from './antivirus-type/antivirus-type.module';
import { CustomHttp } from './shared/extends/CustomHttp ';

import { IdentityService } from './shared/services/identity.service';
import { MemberShipService } from './member-ship.service';
import { AppConfigService } from './app.config';

import { DashboardModule } from './dashboard/dashboard.module';


import { UserOperationsModule } from './user-operations/user-operations.module';
import { AccountModule } from './account/account.module';

import { NgModule,APP_INITIALIZER  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';


import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import * as momentJalaali from 'moment-jalaali';
import { CoreModule } from './core/core.module';
import { AlertModule, CollapseModule } from 'ngx-bootstrap';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { PulicLayoutComponent } from './layout/public/pulic-layout.component';
import { SecureLayoutComponent } from './layout/secure/secure-layout.component';


export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass = 'toast-top-center';
}
export function init(config: AppConfigService) {
  return () => {
    return  config.load(); // add return
  };

}
export function initIdentity(_IdentityService: IdentityService) {
  return () => {
    return _IdentityService.load(); // add return
  };
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AccountModule.forRoot(),
    CoreModule,

    AlertModule.forRoot(),
    CollapseModule.forRoot(),
    UserOperationsModule,
AntivirusTypeModule,
AntivirusLicenceModule,

    DashboardModule,
    ToastModule.forRoot(),

  ],
  declarations: [
    AppComponent,


    PulicLayoutComponent,
    SecureLayoutComponent,


  ],
  providers: [
CustomHttp,

    {
      provide: APP_INITIALIZER,
      useFactory: init,
      multi: true,
      deps: [AppConfigService]
    },
  {
    provide: APP_INITIALIZER,
    useFactory: initIdentity,
    multi: true,
    deps: [IdentityService]
  },
  AppConfigService,
  IdentityService,
     { provide: ToastOptions, useClass: CustomOption }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/


