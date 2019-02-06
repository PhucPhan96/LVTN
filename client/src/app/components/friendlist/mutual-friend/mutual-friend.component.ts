import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { Subscription, Observable } from 'rxjs';
import { Config } from './../../../app.cofig';
import { EventEmitterService } from 'src/app/services/event.emitter.service';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MyResponse } from 'src/app/models/my_response.class';

@Component({
  selector: 'app-mutual-friend',
  templateUrl: './mutual-friend.component.html',
  styleUrls: ['./mutual-friend.component.css']
})
export class MutualFriendComponent implements OnInit {
  @Output('activate') emailChange = new EventEmitter<any>();
  user: User = new User();
  public listFriendUser: User[] = Array<User>();
  public listFriendOfFriend: User[] = Array<User>();
  public listMutualFriend: User[] = Array<User>();
  public subscription: Subscription;
  api: String = this.config.API;
  public numFriend: Number;
  userLogin : String = localStorage.getItem('idUser');
  constructor(private _eventEmitter: EventEmitterService, private friendService: FriendService, private config: Config, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUserByEmail();
  }

  getUserByEmail() {
    this.subscription = this.userService.getUserByEmail(localStorage.getItem('friendemail')).subscribe(data => {

      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      this.user = JSON.parse(JSON.stringify(res.data));
      this.getAllMutualFriend();
    });
  }
  
  getAllFriend(id : String){
    let listUser : User[] = new Array<User>();
    this.subscription = this.friendService.getAllFriends(id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach((e) => {

        if (e.user_one._id == id) {
          let ev: User = JSON.parse(JSON.stringify(e.user_two));
          listUser.push(ev);
        }
        else if (e.user_one._id != id) {
          let ev: User = JSON.parse(JSON.stringify(e.user_one));
          listUser.push(ev);
        }
      });
      // this.numFriend = listUser.length;
    })
    return listUser;
  }

  getAllMutualFriend() {
    this.listFriendUser = this.getAllFriend(this.userLogin);
    this.listFriendOfFriend = this.getAllFriend(this.user._id);
    setTimeout(() => {
      this.listFriendUser.forEach(friend => {
        this.listFriendOfFriend.forEach(fof => {
          if(friend._id == fof._id)
          {
            this.listMutualFriend.push(fof);
          }
        });
      });
  
      console.log(this.listMutualFriend);
    }, 200);
  }

  gotoProfile(user) {
    localStorage.setItem('friendemail', user.email);
    localStorage.setItem('profile', 'friend');
    this._eventEmitter.sendEmailProfile(user.email);
    this.router.navigateByUrl('/editprof/basicInfo');
  }
}
