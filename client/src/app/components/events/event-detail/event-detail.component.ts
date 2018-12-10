import { Component, OnInit, Input } from '@angular/core';

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
  @Input() event : Event;
  isJoin : String = "Tham gia";
  public subscription: Subscription;
  api: String = this.config.API;
  group : Group = new Group();

  constructor(private eventService : EventService, private config: Config, private groupService : GroupService) { }

  ngOnInit() {
    this.subscription = this.groupService.getGroupByID(this.event.group).subscribe(rs => {
      let res = JSON.parse(JSON.stringify(rs));
      this.group = res.msg[0];
      console.log(this.group);
    })

    this.subscription = this.eventService.isJoin(localStorage.getItem('idUser'), this.event._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      
      if(res == null){
        this.isJoin = "Tham gia";
      }
      else {
        this.isJoin = "Rời khỏi";
      }
    })
  }

  joinorleave(event){
    if(this.isJoin == 'Tham gia'){
      this.subscription = this.eventService.joinEvent(localStorage.getItem('idUser'), event).subscribe();
      this.isJoin = 'Rời khỏi';
    }
    else{
      this.subscription = this.eventService.leaveEvent(localStorage.getItem('idUser'), event).subscribe();
      this.isJoin = 'Tham gia';
    }
  }

}
