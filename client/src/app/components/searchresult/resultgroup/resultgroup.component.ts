import { Component, OnInit, Input } from '@angular/core';
import { Group } from './../../../models/group.class';
import { JoinGroup } from './../../../models/join_group.class';
import { Config } from './../../../app.cofig';

import { GroupService } from './../../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultgroup',
  templateUrl: './resultgroup.component.html',
  styleUrls: ['./resultgroup.component.css']
})
export class ResultgroupComponent implements OnInit {
  @Input() group: Group;
  api: String = this.config.API;
  isJoin: String;
  userLogin : String = localStorage.getItem('idUser');
  constructor(private router : Router, private config: Config, private groupService: GroupService) { }

  ngOnInit() {
    this.checkUserJoinGroup();
  }

  checkUserJoinGroup() {
    this.groupService.checkUserJoinGroup(this.userLogin, this.group._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res.len > 0)
        this.isJoin = 'Rời khỏi';
      else
        this.isJoin = 'Tham gia';
    })
  }

  joinOrLeave(){
    if(this.isJoin == 'Rời khỏi'){
      this.groupService.leaveGroup(this.userLogin, this.group._id).subscribe();
      this.isJoin = 'Tham Gia';
    }
    else{
      let jg = new JoinGroup();
      jg.user = this.userLogin;
      jg.group = this.group._id;
      jg.date_join = new Date();
      jg.status = 'joined';
      this.groupService.joinGroup(jg).subscribe();
      this.isJoin = 'Rời khỏi';
    }
  }

  gotoGroup(){
    this.router.navigateByUrl('/groupdetail/intro');
    localStorage.setItem('group', JSON.stringify(this.group).toString());
  }

}
