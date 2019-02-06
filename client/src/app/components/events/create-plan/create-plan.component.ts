import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../../models/my_response.class';
import { Config } from './../../../app.cofig';

import { PlanItem } from './../../../models/plan-item.class';
import { PlanService } from './../../../services/plan.service';
import { WebsocketService } from './../../../services/websocket.service';
@Component({
  selector: 'app-create-plan',
  templateUrl: './create-plan.component.html',
  styleUrls: ['./create-plan.component.css']
})
export class CreatePlanComponent implements OnInit {
  lsPlan: PlanItem[] = Array<PlanItem>();
  event: String;
  public subscription: Subscription;
  api: String = this.config.API;
  newItem: PlanItem = new PlanItem();
  planCur: String;
  isRightDate: Boolean = false;
  notify: String = '';

  constructor(private websocketService: WebsocketService, private router: Router, private config: Config, private planService: PlanService) {
    this.websocketService.newItemPlanReceived().subscribe(data => {
      let newitem = new PlanItem();
      newitem.time = data.time;
      newitem.work = data.work;
      newitem.cost = data.cost;
      newitem.plan = data.plan;
      this.lsPlan.push(newitem);
    })
  }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.checkPlanExist(this.event);
    this.planCur = localStorage.getItem('plan');
  }

  dateChange(value) {
    let dateinput: Date = new Date(value);
    let now: Date = new Date();
    if (dateinput.getTime() > now.getTime()) {
      this.isRightDate = false;
      this.notify = 'Ngày phải nhỏ hơn ngày hiện tại!'
    }
    else {
      this.isRightDate = true;
      this.notify = ''
    }
  }

  checkPlanExist(event: String) {
    this.subscription = this.planService.checkPlanExist(event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res.msg != "null") {
        this.getPlanDetail(this.event);
        localStorage.setItem('plan', res.msg._id);
      }
      else {
        this.subscription = this.planService.createPlan(event).subscribe(data => {
          let rs = JSON.parse(JSON.stringify(data));
          localStorage.setItem('plan', rs.msg[0]._id);
        })
      }
    })
  }

  getPlanDetail(event: String) {
    this.subscription = this.planService.getPlanDetail(event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.lsPlan.push(element);
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
      this.notify = 'Chưa nhập đủ thông tin !';
    }
    else if(this.isRightDate == false){
      this.notify = 'Ngày phải nhỏ hơn ngày hiện tại !';
    }
    else {
      this.websocketService.newItemPlan({ time: this.newItem.time, work: this.newItem.work, cost: this.newItem.cost, plan: this.newItem.plan });
    }
  }

}
