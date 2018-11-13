import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import {MyResponse} from '../models/my_response.class';
import { Friend } from '../models/friend.class';
import { Config } from '../app.cofig';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  public API: String = this.cofig.API;
  public friend: Friend = new Friend();

  constructor(public http: HttpClient, private cofig : Config) { }

  getAllFriend(id : String) : Observable<MyResponse<Friend[]>>{
    var body = {
      _id : id
    };
    return this.http.post<MyResponse<Friend[]>>(this.API + 'getAllFriend/', body);
  }
}
