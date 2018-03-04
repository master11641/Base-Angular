import { AuthService } from "app/core/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy} from "@angular/core";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.css"]
})
export class DefaultComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // if (this.authService.isLoggedIn()) {
    //   this.isLoggedIn = true;
    // }
    this.authService.authStatus$.subscribe(x => {
      this.isLoggedIn = x;
    });
  }
  ngOnDestroy(){

  }
  addQuestion() {
    this.router.navigate([
      "/pages/contact/",
      0,
      { replyid: 0, contacttype: 1 }
    ]);
  }

}
