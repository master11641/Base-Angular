import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { CustomValidatorsModule } from 'app/custom-validators/custom-validators.module';
import { AuthenticationService } from './authentication.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    CustomValidatorsModule,
  ],
  declarations: [LoginComponent, AccessDeniedComponent],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }
