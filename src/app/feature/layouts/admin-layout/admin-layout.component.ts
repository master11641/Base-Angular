import { BrowserStorageService } from "./../../../core/browser-storage.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/core/services/auth.service";


@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.css"]
})
export class AdminLayoutComponent implements OnInit {
  displayName: string;
  constructor(
    private authService: AuthService,

    private browserStorageService: BrowserStorageService
  ) {}

  ngOnInit() {
    this.displayName = this.authService.getDisplayName();
  }
  logout() {
    this.authService.logout(true);
    this.browserStorageService.removeLocal("basket");

  }
}
