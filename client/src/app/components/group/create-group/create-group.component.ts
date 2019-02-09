import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { GroupService } from './../../../services/group.service';
import { Group } from './../../../models/group.class';
import { MyResponse } from './../../../models/my_response.class';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  newGroup: Group = new Group();
  subcription: Subscription;

  constructor(private groupService: GroupService, ) { }

  ngOnInit() {
  }

  createGroup() {
    this.newGroup.avatarpath = "defaultgroup.png";
    this.newGroup.coverpath = "defaultcover.jpg";
    this.newGroup.admin = localStorage.getItem('idUser');
    this.newGroup.funds = 0;
    this.subcription = this.groupService.createGroup(this.newGroup).subscribe(data => {
      let res = new MyResponse();
      res = JSON.parse(JSON.stringify(data));
      if (!res.error) {
        alert('Tạo thành công!')
        location.reload();
      }
      else {
        alert("Thất bại!");
      }
    }, error => {
    });
  }

}
