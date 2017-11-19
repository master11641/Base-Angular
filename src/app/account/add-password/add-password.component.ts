import { UsersService } from './../../user-operations/users.service';
import { User } from './../../user-operations/Models/User';
import { ToastModule, ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MemberShipService } from './../../member-ship.service';
import { Router } from '@angular/router';


import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { matchOtherValidator } from '../../validators/match-validator';
import { UsernameValidator } from '../../validators/username-email-validator';

@Component({
  selector: 'app-add-password',
  templateUrl: './add-password.component.html',
  styleUrls: ['./add-password.component.css']
})
export class AddPasswordComponent implements OnInit {

  public myForm: FormGroup; // our model driven form
  constructor(private _fb: FormBuilder, private service: UsersService,
    private router: Router, private membership: MemberShipService, private uv: UsernameValidator
  ,private _ToastsManager: ToastsManager) { }
  user: User;
  ngOnInit() {
    this.myForm = new FormGroup({
      firstName:new FormControl('', Validators.required),
      lastName:new FormControl('', Validators.required),
      password: new FormControl('', Validators.required) ,
      confirmPassword: new FormControl('', [Validators.required, matchOtherValidator('password')]),
      nationalCode:new FormControl('', Validators.required) ,
      mobile:new FormControl('', Validators.required)
    });
  }

  AddUser() {
    this.user = new User();
    this.user.firstName = this.myForm.value.firstName;
    this.user.lastName = this.myForm.value.lastName;
    this.user.password = this.myForm.value.password;
    this.user.ID = 0;
    this.user.confirmPassword =this.myForm.value.confirmPassword;
    this.user.nationalCode =this.myForm.value.nationalCode;
      this.user. mobile  =this.myForm.value.  mobile;
      this.service.createHero(this.user)
      .subscribe(res=>this._ToastsManager.success('کاربری شما با موفقیت ایجاد شد !'),
    err=>{this._ToastsManager.warning(err,'هشدار ');}
    );


  }
}
