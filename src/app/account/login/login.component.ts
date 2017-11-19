

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MemberShipService } from './../../member-ship.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {Login} from '../../CommonModels/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private membershipService: MemberShipService, private router: Router,private _ToastsManager:ToastsManager) { }
  myform: FormGroup;
  AlertMsg: string;
  Login() {
    // this.membershipService.login(this.myform.get('UserName').value, this.myform.get('Password').value)
    //   .subscribe(res => {
    //     this.router.navigateByUrl('/admin/dashboard');
    //   }
    //   , error => this._ToastsManager.error('نام کاربری یا پسورد اشتباه است .','هشدار!'));
    const loginVm:Login=new Login();
    loginVm.username=this.myform.get('UserName').value;
    loginVm.password=this.myform.get('Password').value;
    this.membershipService.login(loginVm.username,loginVm.password).subscribe(x=>{
this._ToastsManager.success('با موفقیت وارد شدید .','تبریک');
    })
  }

  api() {
    const token: string = localStorage.getItem('access_token');
    alert(token);
    this.membershipService.GetUserStatus().subscribe(x => this.membershipService._UserStatus = x);
  }

  ngOnInit() {

    this.myform = new FormGroup({
      UserName: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });
  }

}
