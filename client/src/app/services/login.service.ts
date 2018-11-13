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
export class LoginService {
  // public username : Object;
  public user: User = new User();
  public API: String = this.cofig.API;

  constructor(public http: HttpClient, private cofig : Config) { }

  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.API + 'getAllUsers/');
  }

  login(e: String, pass : String): Observable<MyResponse<User>> {
    var body =  { 
      password: pass,
      email: e
   };
    return this.http.post<MyResponse<User>>(this.API + 'login/', body);
  }

  register(user : User) : Observable<MyResponse<User>>{
    return this.http.post<MyResponse<User>>(this.API + 'register/', user);
  }
}
