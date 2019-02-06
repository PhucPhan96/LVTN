import { Component, OnInit, Input } from '@angular/core';
import { Event } from './../../../models/event.class';
import { Config } from './../../../app.cofig';

import { EventService } from './../../../services/event.service'

@Component({
  selector: 'app-resultevent',
  templateUrl: './resultevent.component.html',
  styleUrls: ['./resultevent.component.css']
})
export class ResulteventComponent implements OnInit {
  @Input() event : Event;
  api : String = this.config.API;
  isJoin : String = 'Tham gia';
  userlogin : String = localStorage.getItem('idUser');
  constructor(private config : Config, private eventService : EventService) { }

  ngOnInit() {
    this.eventService.isJoin(this.userlogin, this.event._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res == null) {
        this.isJoin = "Tham gia";
      }
      else {
        this.isJoin = "Rời khỏi";
      }
    })
  }

  joinOrLeave(){
    if(this.isJoin == 'Rời khỏi'){
      this.eventService.leaveEvent(this.userlogin, this.event._id).subscribe();
      this.isJoin = 'Tham gia';
    }
    else{
      this.eventService.joinEvent(this.userlogin, this.event._id).subscribe();
      this.isJoin = 'Rời khỏi';
    }
  }
}
