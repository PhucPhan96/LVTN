import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FriendService } from './../../../services/friend.service';
import { UserService } from './../../../services/user.service';
import { Config } from './../../../app.cofig';
import { User } from 'src/app/models/user.class';

import { Subscription } from 'rxjs';
import { MyResponse } from './../../../models/my_response.class';

@Component({
  selector: 'app-friendoffriend',
  templateUrl: './friendoffriend.component.html',
  styleUrls: ['./friendoffriend.component.css']
})
export class FriendoffriendComponent implements OnInit {
  @Output() emailChange = new EventEmitter<String>();
  user : User = new User();
  public listUser : User[] = Array<User>();
  public subscription: Subscription;
  api : String = this.config.API;
  public numFriend : Number;

  constructor(private friendService : FriendService, private config : Config, private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.getUserByEmail();
  }

  getUserByEmail(){
    this.subscription = this.userService.getUserByEmail(localStorage.getItem('friendemail')).subscribe(data => {
      
      let res =new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
      this.user = JSON.parse(JSON.stringify(res.data));
      this.getAllFriend();
    });
  }

  getAllFriend(){
    this.subscription = this.friendService.getAllFriends(this.user._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      console.log(res.msg);
      res.msg.forEach((e) => {
        
        if(e.user_one._id == this.user._id){
          let ev: User= JSON.parse(JSON.stringify(e.user_two));
          this.listUser.push(ev);
        }
        else if(e.user_one._id != this.user._id){
          let ev: User= JSON.parse(JSON.stringify(e.user_one));
          this.listUser.push(ev);
        }
      });
      this.numFriend = this.listUser.length;
    })
  }

  gotoProfile(user){
    localStorage.setItem('friendemail', user.email);
    localStorage.setItem('profile', 'friend');
    this.emailChange.emit(user.email);
    this.router.navigateByUrl('/editprof/basicInfo');
  }

}
