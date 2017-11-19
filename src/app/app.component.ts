import { AppConfigService } from './app.config';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserStatus } from './account/UserStatus';
import { MemberShipService } from './member-ship.service';
import {
  Component,
  OnInit,
  ViewContainerRef,
  HostListener
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RoutesRecognized,
  ActivatedRoute
} from '@angular/router';
import * as momentJalaali from 'moment-jalaali';
import { ShowWellcomeMessageComponent } from './account/show-wellcome-message/show-wellcome-message.component';
import { SideBarComponent } from './core/side-bar/side-bar.component';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private ms: MemberShipService,
    public toastr: ToastsManager,
    viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute,
    private config: AppConfigService

  ) {
    //config.apiRoot;
   console.log(this.config.apiRoot);
    momentJalaali.loadPersian();
    this.viewContainerRef = viewContainerRef;
    this.toastr.setRootViewContainerRef(viewContainerRef);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        this.curentUrl=this.router.url;

        if (
          this.router.url.includes('account') ||
          this.router.url.includes('register')
        ) {
          $('#wrapper').css('padding-right', '0px');
          $('body').css('background-color', '#f1f2f7');
          $('.col-lg-12 ').css('background-color', '#f1f2f7');
          $('.page-wrapper ').css('background-color', '#f1f2f7');
          $('#wrapper').css('background-color', '#f1f2f7');
        } else {
          $('#wrapper').css('padding-right', '225px');
          $('body').css('background-color', '#fff');
          $('.col-lg-12 ').css('background-color', '#fff');
          $('.page-wrapper ').css('background-color', '#fff');
          $('#wrapper').css('background-color', '#fff');
        }
        this.reSizeFunc();
      }
    });
  }
 private  curentUrl :string;
  private viewContainerRef: ViewContainerRef;
  public isCollapsed = false;

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  ngOnInit() {
    // if (this.ms.isLoggedIn()) {
    //   this.router.navigateByUrl('/account/login');
    // }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
   this.reSizeFunc();
  }

  private reSizeFunc(){
   // alert(window.innerWidth+this.curentUrl);S
    if (window.innerWidth < 750) {
      $('#wrapper').css('padding-right', '0px');
    }else{
      if (!(this.curentUrl.includes('account') ||  this.curentUrl.includes('register')) ){
        $('#wrapper').css('padding-right', '225px');
      }
    }
  }
}
