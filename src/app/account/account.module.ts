import { AdminGuard } from './admin.guard';
import { UserOperationsModule } from './../user-operations/user-operations.module';
import { NgModule ,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { MemberShipService } from '../member-ship.service';
import { ShowWellcomeMessageComponent } from './show-wellcome-message/show-wellcome-message.component';
import { AuthGuard } from './auth.guard';
import { MobileVerifyComponent } from './mobile-verify/mobile-verify.component';
import { VerifyCodeCheckComponent } from './verify-code-check/verify-code-check.component';
import { AddPasswordComponent } from './add-password/add-password.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    UserOperationsModule
  ],
  declarations: [LoginComponent, ShowWellcomeMessageComponent, MobileVerifyComponent, VerifyCodeCheckComponent, AddPasswordComponent],
  exports: [ShowWellcomeMessageComponent],
  providers: [MemberShipService, AuthGuard,AdminGuard]
})
export class AccountModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AccountModule,
      providers: [ MemberShipService, AuthGuard, AdminGuard ]
    };
  }
}
