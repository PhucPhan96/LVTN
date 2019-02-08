import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EventEmitterService  } from './../../services/event.emitter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  txtSearch : String;
  constructor(private router : Router, private eventEmitterService : EventEmitterService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  returnHome(){
    this.router.navigateByUrl("/home");
  }

  search(){
    this.eventEmitterService.changeTxtSearch(this.txtSearch);
    this.router.navigateByUrl('/searchresult');
    // localStorage.setItem('txtSearch', this.txtSearch.toString());
    this.txtSearch = "";
  }
}
