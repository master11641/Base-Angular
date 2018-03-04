import { BrowserStorageService } from 'app/core/browser-storage.service';

import { AuthService } from "./../../../core/services/auth.service";
import { Subscription } from "rxjs/Subscription";
import {
  Component,
  OnInit,
  HostListener,
  Inject,
  OnDestroy
} from "@angular/core";
import { Alert } from "selenium-webdriver";
declare var jquery: any;
declare var $: any;
@Component({
  selector: "app-page-layout",
  templateUrl: "./page-layout.component.html",
  styleUrls: ["./page-layout.component.css"]
})
export class PageLayoutComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  subscription: Subscription;
  displayName: string;
  basketCounter:number;
  sampleSubscription: Subscription;
  constructor(private authService: AuthService,
   private browserStorageService:BrowserStorageService) {}
  logout() {
    this.authService.logout(true);
    this.browserStorageService.removeLocal("basket");

  }
  ngOnInit() {
    this.subscription = this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        this.displayName = this.authService.getDisplayName();
      }
    });

  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
  @HostListener("window:scroll", ["$event"])
  onResize(event) {
    this.onScroll(event);
  }
  /*-------------------------------------------------------------
 In   firefox  event.srcElement is  undefined  but  in chrome
 event.view  is     undefined    However  in   both   of them
 event.currentTarget has valid and referenced to window object
-----------------------------------------------------------------*/
  private onScroll(event) {
    // for chrome
    if ($(event.currentTarget).scrollTop()) {
      if ($(event.currentTarget).scrollTop() > 50) {
        $(".opaque-navbar").addClass("opaque");
      } else {
        $(".opaque-navbar").removeClass("opaque");
      }
    }
  }

}
