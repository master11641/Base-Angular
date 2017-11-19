
import { AntivirusTypeService } from './../antivirus-type.service';
import { Response } from '@angular/http';
import { NgxConfirmService } from 'ngx-confirm/ngx-confirm.service';
import { AntiVirusType } from '../models/antivirus-type';
import { Component, OnInit } from '@angular/core';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-antivirus-type-list',
  templateUrl: './antivirus-type-list.component.html',
  styleUrls: ['./antivirus-type-list.component.css']
})
export class AntivirusTypeListComponent implements OnInit {
  constructor(private service:AntivirusTypeService, private _ngxConfirmService: NgxConfirmService) { }
  value: string;
  public totalItems: number;
  public currentPage = 1;
  AllRecords: AntiVirusType[];
  PagingRecords: AntiVirusType[];
  currentRecord: AntiVirusType;
  ngOnInit() {
    this.currentRecord=new  AntiVirusType();
    this.bind();
  }
  bind(): void {
    this.service.getAll().subscribe(response => {
      this.AllRecords = <AntiVirusType[]>response;
      this.totalItems = this.AllRecords.length;
      this.setPage(this.currentPage);
    });
  }
  confim(record: AntiVirusType) {
    this._ngxConfirmService.confirm({
      message: 'آیا از حذف گروه اطمینان دارید ؟',

      onAccept: () => {
        this.accept(record);
      },
      onReject: () => { this.reject(); }
    });
  }
  accept(record: AntiVirusType) {
    alert(record.ID);
    this.service.delete(record.ID).subscribe(Response => {
      this.bind();
    },
      Error => alert('Error Occured ->' + Error)
    );

  }
  reject() { }

  public setPage(pageNo: number): void {
    this.currentPage = pageNo;
    const LastIndex = (this.currentPage * 10) - 1;
    const FirstIndex = (LastIndex - 10) + 1;
    this.PagingRecords = this.AllRecords.slice(FirstIndex, LastIndex+1);
  }

  public pageChanged(event: any): void {
    this.setPage(event.page);
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
  onSelect(record: AntiVirusType): void {
    this.currentRecord = record;
    console.log(record);
    $('.nav-tabs a[href="#menu1"]').tab('show');
  }

}
