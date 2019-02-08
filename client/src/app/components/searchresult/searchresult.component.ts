import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventService } from './../../services/event.service';
import { Event } from './../../models/event.class';
import { GroupService } from './../../services/group.service';
import { Group } from './../../models/group.class';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.class';
import {EventEmitterService  } from './../../services/event.emitter.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {
  lstEvent : Event[] = Array<Event>();
  lstGroup : Group[] = Array<Group>();
  lstUser : User[] = Array<User>();
  txtSearch : String;
  subscription : Subscription;

  constructor(private userService : UserService, private eventService : EventService, private groupService : GroupService, private eventEmitterService : EventEmitterService) { 
    this.eventEmitterService.txtSearchChange.subscribe(data => {
      this.setValueChange(data);
    });
   }

  ngOnInit() {
    this.txtSearch = localStorage.getItem('txtSearch');
    this.getUserByName(this.txtSearch);
    this.getGroupByName(this.txtSearch);
    this.getEventByName(this.txtSearch);
  }

  setValueChange(value : String){
    this.txtSearch = value;
    console.log(this.txtSearch);
    this.getUserByName(this.txtSearch);
    this.getGroupByName(this.txtSearch);
    this.getEventByName(this.txtSearch);
    
  }

  getUserByName(text : String){
    this.lstUser = new Array<User>();
    this.subscription = this.userService.getUserByName(text).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        if(element._id != localStorage.getItem('idUser'))
          this.lstUser.push(element);
      });
    })
  }

  getGroupByName(text : String){
    this.lstGroup = new Array<Group>();
    this.subscription = this.groupService.getGroupByName(text).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        if(element.admin != localStorage.getItem('idUser'))
          this.lstGroup.push(element);
      });
    })
  }

  getEventByName(text : String){
    this.lstEvent = new Array<Event>();
    this.subscription = this.eventService.getEventByName(text).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.lstEvent.push(element);
      });
    })
  }

}
