import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../../models/my_response.class';
import { Config } from './../../../app.cofig';

import { PlanItem } from './../../../models/plan-item.class';
import { PlanService } from './../../../services/plan.service';
import { WebsocketService } from './../../../services/websocket.service';
import { Donate } from 'src/app/models/donate.class';
import { EventService } from './../../../services/event.service';
import { Group } from 'src/app/models/group.class';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  group : Group = new Group();
  newItem: PlanItem = new PlanItem();
  lsPlan: PlanItem[] = Array<PlanItem>();
  lsDonate : Donate[] = Array<Donate>();
  event: String;
  public subscription: Subscription;
  api: String = this.config.API;
  totalFundMoney : number;
  action : String = 'Thêm';
  isAdmin : Boolean = false;
  isJoin: String = "Tham gia";
  totalCost : number = 0;
  notifyMessage : String = '';
  planCur: String;
  isRightDate: Boolean = false;

  constructor(private websocketService: WebsocketService, private router: Router, private config: Config, private planService: PlanService, private eventService : EventService) { 
    this.websocketService.newItemPlanReceived().subscribe(data => {
      let newitem = new PlanItem();
      newitem.time = data.time;
      newitem.work = data.work;
      newitem.cost = data.cost;
      newitem.plan = data.plan;
      this.lsPlan.push(newitem);
      this.totalCost += Number.parseInt(newitem.cost.toString());
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
    this.checkPlanExist(this.event);
    this.planCur = localStorage.getItem('plan');
    this.eventService.getAllDonateReceived(this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      this.totalFundMoney = 0;
      res.msg.forEach(element => {
        if(element.type == 'Hiện vật'){
          this.lsDonate.push(element);
        }
        if(element.type == 'Tiền mặt'){
          this.totalFundMoney += element.quality;
        }
      });
    })
    

    this.subscription = this.eventService.isJoin(localStorage.getItem('idUser'), this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res == null) {
        this.isJoin = "Tham gia";
      }
      else {
        this.isJoin = "Rời khỏi";
      }
    })
    
  }

  dateChange(value) {
    let dateinput: Date = new Date(value);
    let now: Date = new Date(JSON.parse(localStorage.getItem('detailevent')).event_end);
    if (dateinput.getTime() > now.getTime()) {
      this.isRightDate = false;
      this.notifyMessage = 'Ngày phải nhỏ hơn ngày kết thúc sự kiện!'
    }
    else {
      this.isRightDate = true;
      this.notifyMessage = 'Nhấn tab sau khi điền đầy đủ thông tin để lưu lại và tiếp tục.'
    }
  }

  checkPlanExist(event: String) {
    this.subscription = this.planService.checkPlanExist(event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res.msg != "null") {
        this.getPlanDetail(this.event);
        localStorage.setItem('plan', res.msg._id);
      }
      else{
        this.planService.createPlan(this.event);
      }
    })
  }

  getPlanDetail(event: String) {
    this.subscription = this.planService.getPlanDetail(event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.lsPlan.push(element);
        this.totalCost += element.cost;
      });
    })
  }

  isFieldStringInvalid(value: any) {
    return (value == null || value == undefined || value == '');
  }

  addNewItemPlan() {
    this.newItem.plan = this.planCur;
    // this.subscription = this.planService.addPlanDetail(this.newItem).subscribe(data => {
    //   let res = JSON.parse(JSON.stringify(data));
    //     this.lsPlan.push(res.msg);
    // })
    // this.newItem = new PlanItem();
    if (this.isFieldStringInvalid(this.newItem.time) || this.isFieldStringInvalid(this.newItem.work) || this.isFieldStringInvalid(this.newItem.cost)) {
      this.notifyMessage = 'Chưa nhập đủ thông tin !';
    }
    else if(this.isRightDate == false){
      this.notifyMessage = 'Ngày phải nhỏ hơn ngày kết thúc sự kiện!';
    }
    else {
      let number_string : String = this.newItem.cost.toString().replace(/,/g, '');
      console.log(number_string);
      
      this.websocketService.newItemPlan({ time: this.newItem.time, work: this.newItem.work, cost: Number.parseInt(number_string.toString()), plan: this.newItem.plan });
      this.newItem = new PlanItem();
    }
  }

  onKey(event){
    this.addNewItemPlan();
  }

  createPlan(){
    // this.router.navigateByUrl('eventdetail/createplan');
    if(this.action == 'Thêm'){
      this.action = 'Hoàn tất';
      this.notifyMessage = 'Nhấn tab sau khi điền đầy đủ thông tin để lưu lại và tiếp tục.';
    }
    else{
      // this.addSpendingEvent();
      this.notifyMessage = '';
      this.action = 'Thêm';
    }
  }
}
