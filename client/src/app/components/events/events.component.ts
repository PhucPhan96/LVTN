import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';

import { EventService } from './../../services/event.service';
import { Event } from './../../models/event.class';
import { Group } from 'src/app/models/group.class';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  listEvent : Event[] = Array<Event>();
  public subscription: Subscription;
  api: String = this.config.API;
  group : Group = new Group();
  isJoin : String = "Tham gia";
  constructor(private router: Router,  private config: Config, private eventService : EventService) { }

  ngOnInit() {
    this.group = JSON.parse(localStorage.getItem('group'));
    this.getAllEventOfGroup(this.group._id);
  }

  createEvent() {
    this.router.navigateByUrl("groupdetail/createEvent");
  }

  getAllEventOfGroup(id : String){
    
    this.subscription = this.eventService.getAllEventOfGroup(id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      
      res.msg.forEach(element => {
        this.listEvent.push(element);
      });
    })
  }

  detailEvent(event){
    localStorage.setItem('detailevent', JSON.stringify(event).toString());
    this.router.navigateByUrl('eventdetail/plan');
  }
}
