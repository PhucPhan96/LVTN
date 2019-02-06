import { Component, OnInit } from '@angular/core';
import { Group } from './../../../models/group.class';
import { User } from './../../../models/user.class';
import { Subscription } from 'rxjs';
import { Config } from './../../../app.cofig';
import { GroupService } from './../../../services/group.service';
import { UserService } from './../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listmember',
  templateUrl: './listmember.component.html',
  styleUrls: ['./listmember.component.css']
})
export class ListmemberComponent implements OnInit {
  group: Group = new Group();
  listMember: User[] = Array<User>();
  api: String = this.config.API;
  subcription: Subscription;
  constructor(private config: Config, private groupService: GroupService, private userService : UserService, private router : Router) { }

  ngOnInit() {
    this.group = JSON.parse(localStorage.getItem('group'));
    this.subcription = this.userService.getUserByID(this.group.admin).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      
      this.listMember.push(res.msg[0]);
    })
    this.subcription = this.groupService.getAllMemberGroupMain(this.group._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.listMember.push(element.user);
      });
    })
  }

  gotoProfile(member){
    localStorage.setItem('friendemail', member.email);
    if(member.email == localStorage.getItem('user')){
      localStorage.setItem('profile', 'user');
    }
    else{
      localStorage.setItem('profile', 'friend');
    }
    this.router.navigateByUrl('/editprof/basicInfo');
  }
}
