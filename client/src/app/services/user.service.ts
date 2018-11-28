import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable } from 'rxjs/observable';
import { Observable } from 'rxjs';
import { User } from './../models/user.class';
import {MyResponse} from '../models/my_response.class';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // public username : Object;
  public user: User = new User();
  public API: string = 'http://localhost:3200/';

  constructor(public http: HttpClient) { }

  getUserByEmail(e : String): Observable<MyResponse<User>> {
    var body =  { 
      email: e
   };
    return this.http.post<MyResponse<User>>(this.API + 'getUserByEmail/', body);
  }

  updateAvatar(id : String, path : String):Observable<MyResponse<User>>{
    var body =  { 
      _id: id,
      path : path
   };
    return this.http.put<MyResponse<User>>(this.API + 'updateavatar/', body);
  }

  updateCover(id : String, path : String):Observable<MyResponse<User>>{
    var body =  { 
      _id: id,
      path : path
   };
    return this.http.put<MyResponse<User>>(this.API + 'updatecover/', body);
  }

  updatePassword(id : String, password : String):Observable<MyResponse<User>>{
    var body =  { 
      _id: id,
      password : password
   };
    return this.http.put<MyResponse<User>>(this.API + 'updatepassword/', body);
  }

  updateUser(user : User){
    var body = user;
    return this.http.put(this.API + 'updateuser', body);
  }

  getUserByID(_id : String){
    return this.http.get(`${this.API}getUserByID/${_id}`);
  }
}
