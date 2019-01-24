import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from './../../../../app.cofig';

import { Group } from 'src/app/models/group.class';
import { SpendingEvent } from 'src/app/models/spendingevent.class';
import { EventService } from 'src/app/services/event.service';
import { WebsocketService } from './../../../../services/websocket.service';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  lstSpending : SpendingEvent[] = Array<SpendingEvent>();
  newSpending : SpendingEvent = new SpendingEvent();
  isAdmin : Boolean = false;
  group : Group = new Group();
  action : String = 'Thêm';
  api: String = this.config.API;
  event : String;
  constructor(private router: Router, private eventService: EventService, private config: Config, private websocketService: WebsocketService) {
    this.websocketService.newSpendingEventReceived().subscribe(data => {
      let newitem = new SpendingEvent();
      newitem.time = data.time;
      newitem.content = data.content;
      newitem.spending = data.spending;
      newitem.event = data.event;
      this.lstSpending.push(newitem);
    })
   }

  ngOnInit() {
    this.group = JSON.parse(localStorage.getItem('group'));
    
    if(this.group.admin == localStorage.getItem('idUser')){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.getAllSpendingEvent();
  }

  createReport(){
    if(this.action == 'Thêm'){
      this.action = 'Hoàn tất';
    }
    else{
      this.action = 'Thêm';
    }
  }

  getAllSpendingEvent(){
    this.eventService.getAllSpendingEvent(this.event).subscribe(data =>{
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.lstSpending.push(element);
      });
    })
  }

  addSpendingEvent(){
    this.websocketService.addSpendingEvent({time: this.newSpending.time, content: this.newSpending.content, spending: this.newSpending.spending, event: this.event })
    this.newSpending = new SpendingEvent();
  }
}
