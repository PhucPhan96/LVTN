import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MyResponse } from '../models/my_response.class';
import { Observable } from 'rxjs';
import { Config } from '../app.cofig';

import { PlanItem } from './../models/plan-item.class';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  public API: String = this.cofig.API;

  constructor(public http: HttpClient, private cofig: Config) { }

  checkPlanExist(event : String) : Observable<MyResponse<PlanItem>> {
    return this.http.get<MyResponse<PlanItem>>(`${this.API}checkPlanExist/${event}`);
  }

  getPlanDetail(event : String) : Observable<MyResponse<PlanItem[]>> {
    return this.http.get<MyResponse<PlanItem[]>>(`${this.API}getPlanDetail/${event}`);
  }

  addPlanDetail(planItem : PlanItem) : Observable<MyResponse<PlanItem>>{
    return this.http.post<MyResponse<PlanItem>>(this.API + 'addPlanDetail/', planItem);
  }

  createPlan(event : String){
    var body = {
      'event' : event
    }
    return this.http.post(this.API + 'createPlan/', body);
  }
}
