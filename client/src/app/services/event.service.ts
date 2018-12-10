import { Injectable } from '@angular/core';

import { Event } from './../models/event.class';
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
}
