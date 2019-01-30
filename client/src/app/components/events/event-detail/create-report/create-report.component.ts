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
  isFocusNote : Boolean = false;
  notifyMessage : String = '';

  constructor(private router: Router, private eventService: EventService, private config: Config, private websocketService: WebsocketService) {
    this.websocketService.newSpendingEventReceived().subscribe(data => {
      let newitem = new SpendingEvent();
      newitem.content = data.content;
      newitem.quality = data.quality;
      newitem.unit_price = data.unit_price;
      newitem.total = data.total;
      newitem.note = data.note;
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
      this.addSpendingEvent();
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

  onFocus(){
    this.isFocusNote = true;
    console.log('focus');
  }

  focusOutFunction(){
    this.isFocusNote = false;
    console.log('focusout');
  }

  isFieldStringInvalid(value : String){
    return (value == null || value == undefined || value == '');
  }

  addSpendingEvent(){
    if(!this.isFieldStringInvalid(this.newSpending.content)){
      this.websocketService.addSpendingEvent({content: this.newSpending.content, quality : this.newSpending.quality, unit_price : this.newSpending.unit_price, total : this.newSpending.total, note : this.newSpending.note, event: this.event })
      this.newSpending = new SpendingEvent();
    }
    else{
      this.notifyMessage = 'Bạn chưa nhập đầy đủ nội dung!';
    }
  }
  onKey(event){
    this.addSpendingEvent();
  }

  export(){
    this.router.navigateByUrl('/eventdetail/exportspending');
  }
}
