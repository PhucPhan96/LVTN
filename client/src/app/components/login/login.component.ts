import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';
import { User } from './../../models/user.class';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MyResponse } from './../../models/my_response.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String = "";
  pass: String = "";
  birth: Date = new Date();
  public subscription: Subscription;

  public user: User = new User();
  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('/home');
    }
  }

  checkLogin() {
    this.subscription = this.loginService.login(this.username, this.pass).subscribe(data => {
      let islog = {
        email: this.username,
        password: this.pass
      }
      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);

      if (this.username == "" || this.pass == "") {
        alert("Tài khoản hoặc mật khẩu trống!")
      }
      else if (res.msg == 'incorect') {
        console.log("Đăng nhập thất bại! Không tồn tại user");
        this.user.email = "";
        this.user.password = "";
        alert("Tài khoản hoặc mật khẩu không đúng!");
      }
      else {
        console.log("Đăng nhập thành công!");
        this.router.navigateByUrl('/home');
        localStorage.setItem('user', islog.email.toString());
        this.user.email = "";
        this.user.password = "";
      }
    }, error => {
      console.log(error);
      alert("Tài khoản hoặc mật khẩu không đúng!");
    });
  }

  insert() {
    this.user.birthday = this.birth;
    // this.user.username = this.user.firstname.toString() + this.user.lastname.toString();
    this.user.avatarpath = 'defaultuser.png';
    this.user.coverpath = 'defaultcover.jpg';
    this.subscription = this.loginService.register(this.user).subscribe(data => {
      let res = new MyResponse();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
      if (!res.error) {
        alert('Tạo thành công!')
        location.reload();
      }
      else {
        alert("Thất bại!");
      }
    }, error => {
      console.log(error);
    });
  }
}
