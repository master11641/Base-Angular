import { BrowserStorageService } from './../../core/browser-storage.service';
import { AuthenticationService } from "./../authentication.service";
import { AppConfigService } from "./../../core/app-config.service";

import { Register } from "./../models/register";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../../core/services/auth.service";
import { Credentials } from "../../core/models/credentials";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  remoteUsernameValidationUrl = `${
    this.appConfig.configuration.host
  }/api/user/checkExistUserName`;
  model: Credentials = { UserName: "", Password: "", RememberMe: false };
  registerModel: Register = {
    UserName: "",
    Password: "",
    Mobile: "",
    ConfirmPassword: ""
  };
  error = "";
  returnUrl: string;

  constructor(
    private authService: AuthService,

    private router: Router,
    private route: ActivatedRoute,
    private appConfig: AppConfigService,
    private _AuthenticationService: AuthenticationService,
    private browserStorageService:BrowserStorageService
  ) {}

  ngOnInit() {
    // reset the login status
    this.authService.logout(false);

    // get the return url from route parameters
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"];
  }

  submitForm() {
    this.error = "";
    this.authService.login(this.model).subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          if (this.returnUrl) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(["/"]);
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.log("Login error", error);
        if (error.status === 401) {
          this.error = "نام کاربری یا پسورد اشتباه است .";
        } else {
          this.error = `${error.statusText}: ${error.message}`;
        }
      }
    );
  }
  Register(form: NgForm) {
    this.error = "";
    this._AuthenticationService.Register(this.registerModel).subscribe(
      res => {
        this.model.UserName = this.registerModel.UserName;
        this.model.Password = this.registerModel.Password;
        this.submitForm();
      },
      (error: HttpErrorResponse) => {
        console.log("register error", error);
          this.error = `${error.statusText}: ${error.message}`;
      }
    );
  }
}
