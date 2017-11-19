import { VerifyCode } from './../../CommonModels/verifyCode';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MemberShipService } from './../../member-ship.service';
import { Component, OnInit, Input , Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink,ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verify-code-check',
  templateUrl: './verify-code-check.component.html',
  styleUrls: ['./verify-code-check.component.css']
})
export class VerifyCodeCheckComponent implements OnInit {
  @Input() PhoneNumber: string;
@Output() ReturnClick: EventEmitter<string> =new EventEmitter<string>();
  constructor(private membershipService: MemberShipService, private router: Router,private _ToastsManager:ToastsManager
    ,private titleService: Title,private _ActivatedRoute:ActivatedRoute) { }
    myform: FormGroup;
    AlertMsg: string;
    Login() {
      const verifyCode:VerifyCode=new VerifyCode();
      verifyCode.mobile=this.PhoneNumber;
verifyCode.smsCode=this.myform.get('VerifyCode').value;
      this.membershipService.verifyCode(verifyCode)
        .subscribe(res => {
          this._ToastsManager.success('شما ره موبایل شما با موفقیت تایید شد . ');
          this.router.navigateByUrl('/account/addpassword');
        }
        , error => this._ToastsManager.error('کد شما نامعتبر است .','هشدار!'));

    }

    Return() {

 this.ReturnClick.emit('');
    }


    ngOnInit() {
      this.titleService.setTitle( 'بررسی کد اعتبار سنجی| گام دوم ثبت نام' );
      this.myform = new FormGroup({
        VerifyCode: new FormControl('', Validators.required),
      });
    }
}
