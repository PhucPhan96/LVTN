import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';

import { GroupService } from './../../services/group.service';
import { Group } from './../../models/group.class';

@Component({
  selector: 'app-listgroup',
  templateUrl: './listgroup.component.html',
  styleUrls: ['./listgroup.component.css']
})
export class ListgroupComponent implements OnInit {
  listGroup: Group[] = Array<Group>();
  idUser: String = '';
  public subscription: Subscription;
  api: String = this.config.API;
  isAdmin : Boolean;

  constructor(private router: Router, private config: Config, private groupService: GroupService) { }

  ngOnInit() {
    this.idUser = localStorage.getItem('idUser');
    this.getAllGroupUserJoin(this.idUser);
  }

  detail(group) {
    localStorage.setItem('group', JSON.stringify(group).toString());

    this.router.navigateByUrl('/groupdetail/newfeed');
  }

  createGroup() {
    this.router.navigateByUrl('/creategroup');
  }

  getAllGroupUserJoin(id: String) {
    this.subscription = this.groupService.getAllGroupUserJoin(id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.listGroup.push(element.group);
      });
      
      this.subscription = this.groupService.getAllGroupUserAdmin(id).subscribe(rs => {
        let result = JSON.parse(JSON.stringify(rs));
        result.msg.forEach(element => {
          this.listGroup.push(element);
        });
        this.listGroup.forEach(value => {

          this.subscription = this.groupService.getAllMemberGroup(value._id).subscribe(data => {

            let res = JSON.parse(JSON.stringify(data));

            value.member = parseInt(res.count + 1);
          })
        });
      })

    })
  }
}
