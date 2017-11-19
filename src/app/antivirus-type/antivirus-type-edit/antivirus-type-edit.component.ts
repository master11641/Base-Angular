import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AntiVirusType } from './../models/antivirus-type';
import { AntivirusTypeService } from './../antivirus-type.service';
import { AlertModule } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-antivirus-type-edit',
  templateUrl: './antivirus-type-edit.component.html',
  styleUrls: ['./antivirus-type-edit.component.css']
})
export class AntivirusTypeEditComponent implements OnInit {

  constructor(private service: AntivirusTypeService, private _Router: Router,private _ToastsManager:ToastsManager) { }

  myform: FormGroup;
  @Input() editingRecord: AntiVirusType;
  ngOnInit() {
    this.editingRecord = new AntiVirusType();
    this.myform = new FormGroup({
      ID: new FormControl(),
      Name: new FormControl('', Validators.required),
    });

  }
  onSubmit(): void {
    if (this.myform.valid) {
      this.service.edit(<AntiVirusType>this.myform.value)
        .subscribe((PersonGroup: AntiVirusType) => {
          $('.nav-tabs a[href="#home"]').tab('show');
        },err=>{
          this._ToastsManager.error(err,'هشدار!');
        }
      );
    } else {
      alert('لطفا ابتدا رکوردی را انتخاب و فیلد نام را تکمیل سپس اقدام به ثبت نمایید .');
    }
}}

