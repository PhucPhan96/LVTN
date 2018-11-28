import { Component, OnInit } from '@angular/core';
import { Group } from './../../../models/group.class';
import { User } from './../../../models/user.class';
import { Subscription } from 'rxjs';
import { Config } from './../../../app.cofig';
import { GroupService } from './../../../services/group.service';

@Component({
  selector: 'app-mngroup',
  templateUrl: './mngroup.component.html',
  styleUrls: ['./mngroup.component.css']
})
export class MngroupComponent implements OnInit {
  group : Group = new Group();
  api : String = this.config.API;
  subcription : Subscription;
  constructor(private config: Config, private groupService: GroupService) { }

  ngOnInit() {
  }
}
