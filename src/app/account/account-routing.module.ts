import { AddPasswordComponent } from './add-password/add-password.component';
import { VerifyCodeCheckComponent } from './verify-code-check/verify-code-check.component';
import { MobileVerifyComponent } from './mobile-verify/mobile-verify.component';

import { FooterComponent } from './../core/footer/footer.component';
import { SideBarComponent } from './../core/side-bar/side-bar.component';
import { HeaderComponent } from './../core/header/header.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: 'account', children: [
      { path: 'login', component: LoginComponent },
      {
        path: 'verifyphonenumber',
        component: MobileVerifyComponent
      },
      {
        path: 'verifycodecheck/:mobilenumber',
        component: VerifyCodeCheckComponent
      },
      {
        path: 'addpassword',
        component: AddPasswordComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
