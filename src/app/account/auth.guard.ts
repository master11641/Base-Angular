import { UserStatus } from './UserStatus';
import { User } from './../user-operations/Models/User';
import { MemberShipService } from './../member-ship.service';
import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: MemberShipService, private router: Router) {

   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
return true;
   // return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    //  if (this.authService.isLoggedIn()) { return true; }
    if (this.authService._UserStatus.IsAuthenticated) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/account/login']);
    return false;
  }
  canActivateChild() {
    return true;
  }
}


// @Injectable()
// export class AuthGuard implements CanActivate,CanActivateChild {

//   constructor(private authService: MemberShipService,
//     private router: Router) { }

//   canActivate(): boolean {
//    // return this.checkLoggedIn(state.url);
//    return true;
//   }
//   canActivateChild() {
//     return this.canActivate();
//  }
//   checkLoggedIn(url: string): boolean {
//     if (this.authService.isLoggedIn()) {
//       return true;
//     }
//   //  this.authService.redirectUrl = url;
//     this.router.navigate(['/account/login']);

//     return false;
//   }
// }
