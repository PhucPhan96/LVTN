import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../../models/my_response.class';
import { Config } from './../../../app.cofig';

import { Donate } from './../../../models/donate.class';
import { EventService } from './../../../services/event.service';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent implements OnInit {
  dona: Donate = new Donate();
  public subscription: Subscription;
  api: String = this.config.API;
  isSuccess: Boolean = false;
  messalert: String;

  constructor(private router: Router, private config: Config, private eventService: EventService) { }

  ngOnInit() {
  }

  donate() {
    this.isSuccess = true;
    this.dona.time = new Date();
    this.dona.user = localStorage.getItem('idUser');
    this.dona.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.dona.status = "Chưa nhận";
    console.log(this.dona);
    this.subscription = this.eventService.donate(this.dona).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if (res.msg != {}) {
        this.messalert = "Cảm ơn bạn đã đóng góp cho chương trình. Chúc bạn một ngày vui vẻ!"
        this.dona = new Donate();
      }
      else {
        this.messalert = "Xin lỗi! Đã có vấn đề trong quá trình đóng góp."
      }
    });
    setTimeout(() => {
      this.isSuccess = false;
    }, 3000);
  }

}
