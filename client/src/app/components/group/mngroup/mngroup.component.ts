import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from './../../../models/group.class';
import { User } from './../../../models/user.class';
import { Subscription } from 'rxjs';
import { Config } from './../../../app.cofig';
import { GroupService } from './../../../services/group.service';
import { EventService } from './../../../services/event.service';
import { Event } from './../../../models/event.class';

@Component({
  selector: 'app-mngroup',
  templateUrl: './mngroup.component.html',
  styleUrls: ['./mngroup.component.css']
})
export class MngroupComponent implements OnInit {
  listEvent : Event[] = Array<Event>();
  group : Group = new Group();
  api : String = this.config.API;
  subscription : Subscription;
  constructor(private router : Router, private config: Config, private groupService: GroupService, private eventService : EventService) { }

  ngOnInit() {
    this.group = JSON.parse(localStorage.getItem('group'));
    this.getAllEventOfGroup(this.group._id);
  }

  getAllEventOfGroup(id : String){
    
    this.subscription = this.eventService.getAllEventOfGroup(id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      
      res.msg.forEach(element => {
        this.listEvent.push(element);
      });
    })
  }

  createPlan(){
    this.router.navigateByUrl("groupdetail/createplan");
  }
}
