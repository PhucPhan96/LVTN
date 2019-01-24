import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../../models/my_response.class';
import { Config } from './../../../app.cofig';

import { PlanItem } from './../../../models/plan-item.class';
import { PlanService } from './../../../services/plan.service';
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
  lsPlan: PlanItem[] = Array<PlanItem>();
  lsDonate : Donate[] = Array<Donate>();
  event: String;
  public subscription: Subscription;
  api: String = this.config.API;
  totalFundMoney : number;
  isAdmin : Boolean = false;
  isJoin: String = "Tham gia";

  constructor(private router: Router, private config: Config, private planService: PlanService, private eventService : EventService) { }

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

    console.log(this.lsDonate);
    

    this.subscription = this.eventService.isJoin(localStorage.getItem('idUser'), this.event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res == null) {
        this.isJoin = "Tham gia";
      }
      else {
        this.isJoin = "Rời khỏi";
      }
    })
    console.log(this.isJoin);
    
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

  // getAllDonateReceived(event: String) {
  //   this.subscription = this.eventService.getAllDonateReceived(event).subscribe(data => {
  //     let res = JSON.parse(JSON.stringify(data));
  //     res.msg.forEach(element => {
  //       this.lsDonate.push(element);
  //     });
  //   })
  // }

  createPlan(){
    this.router.navigateByUrl('eventdetail/createplan');
  }
}
