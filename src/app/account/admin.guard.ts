import { UserStatus } from './UserStatus';
import { User } from './../user-operations/Models/User';
import { MemberShipService } from './../member-ship.service';
import { Injectable } from '@angular/core';

import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(private authService: MemberShipService, private router: Router) {

   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkAdmin(url);
  }
  checkAdmin(url: string): boolean {
    if (this.authService._UserStatus.RoleName.includes('Admin')) { return true; }
       // this.authService.redirectUrl = url;
    this.router.navigate(['/account/login']);
    return false;
  }
  canActivateChild() {
    return true;
  }
}

