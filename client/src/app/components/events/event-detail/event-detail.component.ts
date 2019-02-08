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
  status: String;
  now: Date = new Date();
  totalmember : number = 0;

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

    if (this.compareDate(this.ev.event_start, this.now) == 1) {
      this.status = "Sắp diễn ra";
    }
    else if(this.compareDate(this.ev.event_end, this.now) == -1){
      this.status = "Đã kết thúc";
    }
    else if(this.compareDate(this.ev.event_start, this.now) == -1 && this.compareDate(this.ev.event_end, this.now) == 1){
      this.status = "Đang diễn ra";
    }

    this.subscription = this.eventService.isJoin(localStorage.getItem('idUser'), this.ev._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res == null) {
        this.isJoin = "Tham gia";
      }
      else {
        this.isJoin = "Rời khỏi";
      }
    })
    this.eventService.getAllEventMember(this.ev._id).subscribe(data => {
      let rs = JSON.parse(JSON.stringify(data));
      this.totalmember += rs.len;
      console.log(this.totalmember);
      
    })
  }

  compareDate(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    let d1 = new Date(date1); let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;

    // Check if the first is less than second
    if (d1 < d2) return -1;
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

  createReport() {
    this.router.navigateByUrl('eventdetail/createreport');
  }

  summary(){
    this.router.navigateByUrl('eventdetail/summaryevent');
  }
}
