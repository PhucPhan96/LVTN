import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Config } from './../../../../app.cofig';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Donate } from './../../../../models/donate.class';
import { User } from './../../../../models/user.class';
import { EventService } from './../../../../services/event.service';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'app-donate-item',
  templateUrl: './donate-item.component.html',
  styleUrls: ['./donate-item.component.css']
})
export class DonateItemComponent implements OnInit {
  @Input() donate_item : Donate;
  userDonate : User = new User();
  public subscription: Subscription;
  api: String = this.config.API;

  constructor(private config: Config, private eventService: EventService, private modalService: NgbModal, private userService : UserService) { }

  ngOnInit() {
    
    this.subscription = this.userService.getUserByID(this.donate_item.user).subscribe(data => {
      this.userDonate = JSON.parse(JSON.stringify(data)).msg[0];
    })
  }

  confirm(content){
    if(this.donate_item.status == "Chưa nhận")
      this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  received(){
    if(this.donate_item.status == "Chưa nhận"){
      this.subscription = this.eventService.updateStatusDonate(this.donate_item._id).subscribe();
      this.donate_item.status = "Đã nhận";
    }
    this.modalService.dismissAll();
  }

  notReceived(){
    this.modalService.dismissAll();
  }

}
