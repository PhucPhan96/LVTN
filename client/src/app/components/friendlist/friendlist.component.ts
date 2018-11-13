import { Component, OnInit } from '@angular/core';
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
  email : String = "";
  idUser : String = "";
  public subscription: Subscription;

  constructor(private friendService : FriendService, private config : Config, private userService : UserService) { }

  ngOnInit() {
    this.email = localStorage.getItem('user');
    this.getUserByEmail();
    this.getAllFriend();
  }

  getUserByEmail(){
    this.subscription = this.userService.getUserByEmail(this.email).subscribe(data => {
      
      let res =new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
      this.user = JSON.parse(JSON.stringify(res.data));
      this.idUser = this.user._id;
      console.log(this.idUser);
      
    });
  }

  getAllFriend(){
    this.subscription = this.friendService.getAllFriend(this.idUser).subscribe(data => {
      console.log(data);
    })
  }

}
