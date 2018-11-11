import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

import { UserService } from './../../services/user.service';
import { User } from './../../models/user.class';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user : User = new User();
  email : String = "";

  public api : String = this.cofig.API;

  public subscription: Subscription;

  constructor(private router : Router, private userService : UserService, private cofig : Config) { }

  ngOnInit() {
    $(function () {
      $('.list-group').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
      });
    });
    this.router.navigateByUrl('/home');
    console.log(localStorage.getItem('user'));
    this.email = localStorage.getItem('user');
    
    this.getUserByEmail();
    console.log(this.api);
    
  }

  editProf(){
    this.router.navigateByUrl('/editprof/basicInfo');
  }

  getUserByEmail(){
    this.subscription = this.userService.getUserByEmail(this.email).subscribe(data => {
      
      let res =new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
      this.user = JSON.parse(JSON.stringify(res.data));
      console.log(this.user);
      
    });
  }
}
