import { MemberShipService } from './../../member-ship.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-wellcome-message',
  templateUrl: './show-wellcome-message.component.html',
  styleUrls: ['./show-wellcome-message.component.css']
})
export class ShowWellcomeMessageComponent implements OnInit {

  constructor(private ms: MemberShipService) { }
  message = 'کاربر گرامی ' + this.ms._UserStatus.Name + '  خوش آمدید';
  ngOnInit() {
  }

}
