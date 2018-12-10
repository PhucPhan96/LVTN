import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../../models/my_response.class';
import { Config } from './../../../app.cofig';

import { EventService } from './../../../services/event.service';
import { Event } from './../../../models/event.class';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.css']
})
export class MyeventComponent implements OnInit {

  listEvent : Event[] = Array<Event>();
  public subscription: Subscription;
  api: String = this.config.API;
  isJoin : String = "Tham gia";
  constructor(private router: Router, private config: Config, private eventService : EventService) { }

  ngOnInit() {
    this.getAllEventOfGroup(localStorage.getItem('idUser'));
  }

  createEvent() {
    this.router.navigateByUrl("groupdetail/createEvent");
  }

  getAllEventOfGroup(id : String){
    
    this.subscription = this.eventService.getAllEventOfUser(id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      
      res.msg.forEach(element => {
        this.listEvent.push(element.event);
      });
    })
  }

}
