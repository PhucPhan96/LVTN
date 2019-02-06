import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../services/user.service';
import { User } from './../../models/user.class';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  user : User = new User();
  oldPass : String = "";
  newPass : String = "";
  confirmPass : String = "";
  public subscription: Subscription;

  constructor(private router : Router, private userService : UserService) { }

  ngOnInit() {
    this.getUserByEmail();
  }

  getUserByEmail(){
    this.subscription = this.userService.getUserByEmail(localStorage.getItem('user')).subscribe(data => {
      
      let res =new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      this.user = JSON.parse(JSON.stringify(res.data));
    });
  }

  updatePassword(){
    if(this.newPass!=this.confirmPass){
      alert('Confirm fail!');
    }
    else{
      this.subscription = this.userService.updatePassword(this.user._id, this.newPass).subscribe(data =>{
      })
    }
  }
}
