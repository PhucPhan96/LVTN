import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FriendService } from './../../services/friend.service';
import { UserService } from './../../services/user.service';

import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
  user : User = new User();
  public listUser : User[] = Array<User>();
  email : String = "";
  public subscription: Subscription;
  api : String = this.config.API;
  public numFriend : Number;

  constructor(private friendService : FriendService, private config : Config, private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.email = localStorage.getItem('user');
    this.getUserByEmail();
  }

  getUserByEmail(){
    this.subscription = this.userService.getUserByEmail(this.email).subscribe(data => {
      
      let res =new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      this.user = JSON.parse(JSON.stringify(res.data));
      this.getAllFriend();
    });
  }

  getAllFriend(){
    this.subscription = this.friendService.getAllFriends(this.user._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
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

  gotoProfile(event){
    localStorage.setItem('friendemail', event.email)
    localStorage.setItem('profile', 'friend');
    this.router.navigateByUrl('/editprof/basicInfo');
  }

}
