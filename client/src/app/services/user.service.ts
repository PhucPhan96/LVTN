import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/observable';
import { Observable } from 'rxjs';
import { User } from './../models/user.class';
import {MyResponse} from '../models/my_response.class';
import { Config } from './../app.cofig';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // public username : Object;
  public user: User = new User();
  public api : String = this.config.API;

  constructor(public http: HttpClient, private config : Config) { }

  getUserByEmail(e : String): Observable<MyResponse<User>> {
    var body =  { 
      email: e
   };
    return this.http.post<MyResponse<User>>(this.api + 'getUserByEmail/', body);
  }

  getUserByName(search : String) : Observable<MyResponse<Event[]>>{
    return this.http.get<MyResponse<Event[]>>(`${this.api}getUserByName/${search}`);
  }

  updateAvatar(id : String, path : String):Observable<MyResponse<User>>{
    var body =  { 
      _id: id,
      path : path
   };
    return this.http.put<MyResponse<User>>(this.api + 'updateavatar/', body);
  }

  updateCover(id : String, path : String):Observable<MyResponse<User>>{
    var body =  { 
      _id: id,
      path : path
   };
    return this.http.put<MyResponse<User>>(this.api + 'updatecover/', body);
  }

  updatePassword(id : String, password : String):Observable<MyResponse<User>>{
    var body =  { 
      _id: id,
      password : password
   };
    return this.http.put<MyResponse<User>>(this.api + 'updatepassword/', body);
  }

  updateUser(user : User){
    var body = user;
    return this.http.put(this.api + 'updateuser', body);
  }

  getUserByID(_id : String){
    return this.http.get(`${this.api}getUserByID/${_id}`);
  }
}
