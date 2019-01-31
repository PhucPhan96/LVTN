import { Injectable } from '@angular/core';

import { Event } from './../models/event.class';
import { Donate } from './../models/donate.class';
import { SpendingEvent } from './../models/spendingevent.class';
import { Config } from './../app.cofig';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MyResponse } from '../models/my_response.class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public API: String = this.config.API;

  constructor(private config : Config, public http: HttpClient) { }

  createEvent(event : Event) : Observable<MyResponse<Event>>{
    return this.http.post<MyResponse<Event>>(this.API + 'createEvent/', event);
  }

  getAllEventOfGroup(_id : String) : Observable<MyResponse<Event[]>>{
    return this.http.get<MyResponse<Event[]>>(`${this.API}getAllEventOfGroup/${_id}`);
  }

  getAllEventOfUser(_id : String) : Observable<MyResponse<Event[]>>{
    return this.http.get<MyResponse<Event[]>>(`${this.API}getAllEventOfUser/${_id}`);
  }
  
  getEventByName(title : String) : Observable<MyResponse<Event[]>>{
    return this.http.get<MyResponse<Event[]>>(`${this.API}getEventByName/${title}`);
  }

  donate(dona : Donate) : Observable<MyResponse<Donate>>{
    return this.http.post<MyResponse<Donate>>(this.API + 'donate/', dona);
  }

  getAllDonateEvent(event : String) : Observable<MyResponse<Donate[]>>{
    return this.http.get<MyResponse<Donate[]>>(`${this.API}getAllDonateEvent/${event}`);
  }

  updateStatusDonate(id : String) : Observable<MyResponse<Donate>>{
    var body = {
      _id : id
    }
    return this.http.put<MyResponse<Donate>>(this.API + 'updateStatusDonate/', body);
  }

  getAllDonateReceived(event : String) : Observable<MyResponse<Donate[]>>{
    return this.http.get<MyResponse<Donate[]>>(`${this.API}getAllDonateReceived/${event}`);
  }

  isJoin(user : String, event : String){
    var body = {
      user : user,
      event : event
    }
    return this.http.post(this.API + 'isJoin/', body);
  }

  joinEvent(user : String, event : String){
    var body = {
      user : user,
      event : event
    }
    return this.http.post(this.API + 'joinEvent/', body);
  }

  leaveEvent(user : String, event : String){
    var body = {
      user : user,
      event : event
    }
    return this.http.post(this.API + 'leaveEvent/', body);
  }

  getAllSpendingEvent(event : String) : Observable<MyResponse<SpendingEvent[]>>{
    return this.http.get<MyResponse<SpendingEvent[]>>(`${this.API}getAllSpendingEvent/${event}`);
  }

  getEventComingSoon() : Observable<MyResponse<Event[]>>{
    return this.http.get<MyResponse<Event[]>>(`${this.API}getEventComingSoon`);
  }

  // addSpendingEvent(spend : SpendingEvent) : Observable<MyResponse<SpendingEvent>>{
  //   return this.http.post<MyResponse<SpendingEvent>>(this.API + 'addSpendingEvent/', spend);
  // }
}
