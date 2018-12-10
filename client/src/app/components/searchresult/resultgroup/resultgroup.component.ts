import { Component, OnInit, Input } from '@angular/core';
import { Group } from './../../../models/group.class';
import { Config } from './../../../app.cofig';

@Component({
  selector: 'app-resultgroup',
  templateUrl: './resultgroup.component.html',
  styleUrls: ['./resultgroup.component.css']
})
export class ResultgroupComponent implements OnInit {
  @Input() group : Group;
  api : String = this.config.API;
  constructor(private config : Config) { }onstructor() { }

  ngOnInit() {
  }

}
