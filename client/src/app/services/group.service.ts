import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MyResponse} from '../models/my_response.class';
import { Observable } from 'rxjs';
import { Config } from '../app.cofig';
import { Group } from '../models/group.class';
import { JoinGroup } from '../models/join_group.class';
@Injectable({
  providedIn: 'root'
})
export class GroupService {
  // public group: Group = new Group();
  public API: String = this.cofig.API;

  constructor(public http: HttpClient, private cofig: Config) { }

  getGroupByName(name : String) : Observable<MyResponse<Event[]>>{
    return this.http.get<MyResponse<Event[]>>(`${this.API}getGroupByName/${name}`);
  }

  getAllGroupUserJoin(_id : String){
    return this.http.get(`${this.API}getAllGroupUserJoin/${_id}`);
  }

  getAllGroupUserAdmin(_id : String){
    return this.http.get(`${this.API}getAllGroupUserAdmin/${_id}`);
  }

  getAllMemberGroup(_id : String){
    return this.http.get(`${this.API}getAllMemberGroup/${_id}`);
  }

  getAllMemberGroupMain(_id : String){
    return this.http.get(`${this.API}getAllMemberGroupMain/${_id}`);
  }

  getGroupByID(_id : String){
    return this.http.get(`${this.API}getGroupByID/${_id}`);
  }

  checkUserJoinGroup(user : String, group : String){
    return this.http.get(`${this.API}checkUserJoinGroup/${user}/${group}`);
  }

  joinGroup(join_group : JoinGroup) : Observable<MyResponse<JoinGroup>>{
    return this.http.post<MyResponse<JoinGroup>>(this.API + 'joinGroup/', join_group);
  }

  leaveGroup(user : String, group : String){
    return this.http.get(`${this.API}leaveGroup/${user}/${group}`);
  }

  createGroup(group : Group) : Observable<MyResponse<Group>>{
    return this.http.post<MyResponse<Group>>(this.API + 'createGroup/', group);
  }

  updateAvatar(id : String, path : String):Observable<MyResponse<Group>>{
    var body =  { 
      _id: id,
      path : path
   };
    return this.http.put<MyResponse<Group>>(this.API + 'updateAvatarGroup/', body);
  }

  updateCover(id : String, path : String):Observable<MyResponse<Group>>{
    var body =  { 
      _id: id,
      path : path
   };
    return this.http.put<MyResponse<Group>>(this.API + 'updateCoverGroup/', body);
  }
}
