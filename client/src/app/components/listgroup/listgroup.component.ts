import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listgroup',
  templateUrl: './listgroup.component.html',
  styleUrls: ['./listgroup.component.css']
})
export class ListgroupComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  detail(){
    this.router.navigateByUrl('/groupdetail/intro');
  }

  createGroup(){
    this.router.navigateByUrl('/creategroup');
  }
}
