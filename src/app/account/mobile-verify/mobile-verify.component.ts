import { MobileVm } from './../../CommonModels/mobile';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MemberShipService } from './../../member-ship.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-mobile-verify',
  templateUrl: './mobile-verify.component.html',
  styleUrls: ['./mobile-verify.component.css']
})
export class MobileVerifyComponent implements OnInit {

  constructor(private membershipService: MemberShipService, private router: Router,private _ToastsManager:ToastsManager
  ,private titleService: Title) { }
  myform: FormGroup;
  AlertMsg: string;
  VerifyCodeState;boolean;
  PhoneNumber:string;
  MobileVm:MobileVm;
  Login() {

this.membershipService.checkMobileNumber(this.MobileVm).subscribe(x=>{

this._ToastsManager.success('پیامک با موفقیت ارسال شد .\r\n کد اعتبار سنجی ارسال شده را در کادر ذیل وارد نمایید .','پیغام!');
this.VerifyCodeState=true;
this.PhoneNumber=this.myform.get('mobile').value;
this.titleService.setTitle( 'بررسی تاییدیه اعتبار سنجی| گام دوم ثبت نام' );
},err=>{
  this._ToastsManager.error(err._body.message,'هشدار!');
});


  }

onReturnClicked(message:string):void
{
  this.VerifyCodeState=false;
  this.titleService.setTitle( 'درخواست ارسال کد اعتبار سنجی| گام اول ثبت نام' );
}
  ngOnInit() {
    this.MobileVm=new  MobileVm();
    this.titleService.setTitle( 'درخواست ارسال کد اعتبار سنجی| گام اول ثبت نام' );
    this.myform = new FormGroup({
      mobile: new FormControl('', Validators.required),
    });
  }
}
