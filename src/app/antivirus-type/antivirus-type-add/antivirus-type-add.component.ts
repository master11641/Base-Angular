import { ToastsManager, ToastModule } from 'ng2-toastr/ng2-toastr';
import { AntiVirusType } from './../models/antivirus-type';
import { AntivirusTypeService } from './../antivirus-type.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-antivirus-type-add',
  templateUrl: './antivirus-type-add.component.html',
  styleUrls: ['./antivirus-type-add.component.css']
})
export class AntivirusTypeAddComponent implements OnInit {

  constructor(private service: AntivirusTypeService,private _Router: Router,private _ToastsManager:ToastsManager) { }

  myform: FormGroup;
  ngOnInit() {
    this.myform = new FormGroup({
      ID: new FormControl(),
      Name: new FormControl('', Validators.required),
    });
  }
  onSubmit(): void {
    console.log('from component :' + this.myform.value);
    this.service.add(<AntiVirusType>this.myform.value)
      .subscribe(res => {
this._ToastsManager.success('آنتی ویروس با موفقیت ثبت شد','پیغام !');
        this._Router.navigateByUrl('/admin/AntiViruses');

      },err=>{
        this._ToastsManager.error(err,'هشدار!');
      });
  }
}
