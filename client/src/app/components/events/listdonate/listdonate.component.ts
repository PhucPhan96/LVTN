import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Config } from './../../../app.cofig';

import { Donate } from './../../../models/donate.class';
import { EventService } from './../../../services/event.service';

@Component({
  selector: 'app-listdonate',
  templateUrl: './listdonate.component.html',
  styleUrls: ['./listdonate.component.css']
})
export class ListdonateComponent implements OnInit {
  listDonate : Donate[] = Array<Donate>();
  public subscription: Subscription;
  api: String = this.config.API;
  event : String;
  constructor(private router: Router, private config: Config, private eventService: EventService) { }

  ngOnInit() {
    this.event = JSON.parse(localStorage.getItem('detailevent'))._id;
    console.log(this.event);
    this.getAllDonateEvent();
  }

  getAllDonateEvent(){
    this.subscription = this.eventService.getAllDonateEvent(this.event).subscribe(data =>{
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.listDonate.push(element);
      });
      console.log(this.listDonate);
      
    })
  }

}
