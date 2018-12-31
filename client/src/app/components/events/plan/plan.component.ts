import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../../models/my_response.class';
import { Config } from './../../../app.cofig';

import { PlanItem } from './../../../models/plan-item.class';
import { PlanService } from './../../../services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  lsPlan: PlanItem[] = Array<PlanItem>();
  event: String;
  public subscription: Subscription;
  api: String = this.config.API;

  constructor(private router: Router, private config: Config, private planService: PlanService) { }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    this.checkPlanExist(this.event);
    console.log(this.lsPlan);
  }

  checkPlanExist(event: String) {
    this.subscription = this.planService.checkPlanExist(event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      console.log(res);

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
      });
    })
  }

  createPlan(){
    this.router.navigateByUrl('eventdetail/createplan');
  }
}
