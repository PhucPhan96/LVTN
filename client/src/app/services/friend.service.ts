import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyResponse } from '../models/my_response.class';
import { Friend } from '../models/friend.class';
import { Config } from '../app.cofig';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  public API: String = this.cofig.API;
  public friend: Friend = new Friend();

  constructor(public http: HttpClient, private cofig: Config) { }

  getAllFriends(id : String){
    // console.log('id ' + id);
    return this.http.get(`${this.API}getAllFriend/${id}`);
  }

  checkFriend(user_one : String, user_two : String){
    var body = {
      user_one : user_one,
      user_two : user_two
    }
    return this.http.post(`${this.API}checkFriend`, body);
  }

  addFriend(user_one : String, user_two : String, status : String){
    var body = {
      user_one : user_one,
      user_two : user_two,
      status : status
    }
    return this.http.post(`${this.API}addFriend`, body);
  }
}
