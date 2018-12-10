import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './../../../models/user.class';
import { Config } from './../../../app.cofig';
import { Subscription } from 'rxjs';

import { FriendService } from './../../../services/friend.service';
@Component({
  selector: 'app-resultpeple',
  templateUrl: './resultpeple.component.html',
  styleUrls: ['./resultpeple.component.css']
})
export class ResultpepleComponent implements OnInit {
  @Input() user : User;
  api : String = this.config.API;
  subscription : Subscription;
  status : String = "Kết bạn";

  constructor(private config : Config, private friendService : FriendService, private router : Router) { }

  ngOnInit() {
    this.checkUser(localStorage.getItem('idUser'), this.user._id);
  }

  checkUser(user_one: String, user_two : String){
    this.subscription = this.friendService.checkFriend(user_one, user_two).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if(res.msg == "notexist"){
        this.status = "Kết bạn";
      }
      else if(res.msg == "OK"){
        this.status = "Bạn bè";
      }
      console.log(this.status);
      
    })
  }

  gotoProfile(user){
    localStorage.setItem('friendemail', user.email)
    this.router.navigateByUrl('/editprof/basicInfo');
  }

  addFriend(user){
    this.subscription = this.friendService.addFriend(localStorage.getItem('idUser'), user._id, 'friend').subscribe(data => {
      console.log(data);
      let res = JSON.parse(JSON.stringify(data));
      if(res != 'Error!' )
      {
        this.status = "Bạn bè";
      }
    });
  }
}
