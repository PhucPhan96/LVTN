import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Config } from './../../../../app.cofig';

import { Donate } from './../../../../models/donate.class';
import { EventService } from './../../../../services/event.service';

@Component({
  selector: 'app-donate-item',
  templateUrl: './donate-item.component.html',
  styleUrls: ['./donate-item.component.css']
})
export class DonateItemComponent implements OnInit {
  @Input() donate_item : Donate;
  public subscription: Subscription;
  api: String = this.config.API;

  constructor(private config: Config, private eventService: EventService) { }

  ngOnInit() {
  }

  confirm(){
    if(this.donate_item.status == "Chưa nhận"){
      this.subscription = this.eventService.updateStatusDonate(this.donate_item._id).subscribe();
      this.donate_item.status = "Đã nhận";
    }
  }

}
