import { Component, OnInit, Input } from '@angular/core';
import { Event } from './../../../models/event.class';
import { Config } from './../../../app.cofig';

@Component({
  selector: 'app-resultevent',
  templateUrl: './resultevent.component.html',
  styleUrls: ['./resultevent.component.css']
})
export class ResulteventComponent implements OnInit {
  @Input() event : Event;
  api : String = this.config.API;
  constructor(private config : Config) { }

  ngOnInit() {
  }

}
