import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { User } from './../../models/user.class';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';

@Component({
  selector: 'app-edit-basic',
  templateUrl: './edit-basic.component.html',
  styleUrls: ['./edit-basic.component.css']
})
export class EditBasicComponent implements OnInit {
  user : User = new User();
  email : String = ""
  public subscription: Subscription;

  public api : String = this.cofig.API;
  constructor(private router : Router, private userService : UserService, private cofig : Config) { }

  ngOnInit() {
    this.email = localStorage.getItem('user');
    
    this.getUserByEmail();
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

  changeBirthday(event : any){
    this.user.birthday = event.target.value;
    console.log(this.user.birthday);
    
  }

  updateUser(){
    console.log(JSON.parse(JSON.stringify(this.user)));
    
    this.subscription = this.userService.updateUser(JSON.parse(JSON.stringify(this.user))).subscribe(data =>{
      console.log(data);
    });
    this.router.navigateByUrl('editprof/basicInfo');
  }

}
