import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { Subscription } from 'rxjs';
import { Event } from './../../../models/event.class';
import { Group } from './../../../models/group.class';
import { EventService } from './../../../services/event.service';
import { Config } from './../../../app.cofig';
import { GroupService } from './../.././../services/group.service';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;
  ev: Event = new Event();
  isJoin: String = "Tham gia";
  public subscription: Subscription;
  api: String = this.config.API;
  group: Group = new Group();
  isAdmin: Boolean = false;

  constructor(private router: Router, private eventService: EventService, private config: Config, private groupService: GroupService) { }

  ngOnInit() {
    $(function () {
      $('.edit-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
      });
    });
    this.ev = JSON.parse(localStorage.getItem('detailevent'));
    this.subscription = this.groupService.getGroupByID(this.ev.group).subscribe(rs => {
      let res = JSON.parse(JSON.stringify(rs));
      this.group = res.msg[0];
      if (this.group.admin == localStorage.getItem('idUser')) {
        this.isAdmin = true;
      }
      else {
        this.isAdmin = false;
      }
    })

    this.subscription = this.eventService.isJoin(localStorage.getItem('idUser'), this.ev._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res == null) {
        this.isJoin = "Tham gia";
      }
      else {
        this.isJoin = "Rời khỏi";
      }
    })

  }

  joinorleave(event) {
    if (this.isJoin == 'Tham gia') {
      this.subscription = this.eventService.joinEvent(localStorage.getItem('idUser'), event).subscribe();
      this.isJoin = 'Rời khỏi';
    }
    else {
      this.subscription = this.eventService.leaveEvent(localStorage.getItem('idUser'), event).subscribe();
      this.isJoin = 'Tham gia';
    }
  }

  donate() {
    this.router.navigateByUrl('eventdetail/donate');
  }

  homeevent() {
    this.router.navigateByUrl('eventdetail/plan');
  }

  listDonate() {
    this.router.navigateByUrl('eventdetail/listdonate');
  }

  createReport(){
    this.router.navigateByUrl('eventdetail/createreport');
  }
}
