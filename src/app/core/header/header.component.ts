import { Router } from '@angular/router';
import { MemberShipService } from './../../member-ship.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private ms: MemberShipService, private router: Router) { }

  UserName: string;
  public isCollapsed = false;
  UsreId: number;
  Name: string;
  RoleName: string;
  IsAdmin: boolean;

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }
  ngOnInit() {
    this.ms.GetUserStatus().subscribe(res => {
      this.UserName = res.UserName;
      this.Name = res.Name;
      this.RoleName = res.RoleName;
      if (res.RoleName.includes('Admin')) {
         this.IsAdmin = true;
      }
    });
    //  this.UserName = this.ms._UserStatus.UserName;
    // this.Name = this.ms._UserStatus.Name;
    this.UsreId = 1;
  }
  logout(): void {
    this.ms.logout();
  }
}
