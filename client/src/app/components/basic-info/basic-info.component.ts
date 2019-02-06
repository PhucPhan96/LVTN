import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { User } from './../../models/user.class';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  user : User = new User();
  email : String = ""
  public subscription: Subscription;
  isProfile : String = "";

  public api : String = this.cofig.API;
  constructor(private router : Router, private userService : UserService, private cofig : Config) {
  }

  ngOnInit() {
    this.isProfile = localStorage.getItem('profile');
    
    if(this.isProfile == 'user'){
      this.email = localStorage.getItem('user');
    }
    else if(this.isProfile == 'friend'){
      this.email = localStorage.getItem('friendemail');
    }
    
    this.getUserByEmail();
  }

  getUserByEmail(){
    this.subscription = this.userService.getUserByEmail(this.email).subscribe(data => {
      
      let res =new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      this.user = JSON.parse(JSON.stringify(res.data));
    });
  }

}
