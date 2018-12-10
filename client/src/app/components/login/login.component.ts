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
  confimPass: String = "";
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
      localStorage.setItem('idUser', res.data[0]._id.toString())

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

  checkRequire(value: String): Boolean {
    if (value == undefined || value == '' || value == null) {
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  checkPassword(str) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
  }

  insert() {
    this.user.birthday = this.birth;
    // this.user.username = this.user.firstname.toString() + this.user.lastname.toString();
    this.user.avatarpath = 'defaultuser.png';
    this.user.coverpath = 'defaultcover.jpg';
    if (this.checkRequire(this.user.firstname) == false || this.checkRequire(this.user.lastname) == false)
      alert("Bạn nhập thiếu họ tên rồi. Vui lòng nhập đầy đủ thông tin!");
    else if (this.checkRequire(this.user.email) == false)
      alert("Vui lòng nhập Email của bạn!");
    else if (!this.validateEmail(this.user.email))
      alert("Email không hợp lệ! Vui lòng nhập lại.");
    else if (this.checkRequire(this.user.password) == false)
      alert("Bạn chưa nhập mật khẩu!");
    else if (!this.checkPassword(this.user.password))
      alert("Mật khẩu của bạn không hợp lệ! Mật khẩu phải dài ít nhất 6 ký tự, ít nhất một chữ số, một chữ thường và một chữ hoa.")
    else if (this.checkRequire(this.confimPass) == false)
      alert("Vui lòng nhập lại mật khẩu để xác nhận!")
    else if (this.user.password != this.confimPass)
      alert("Mật khẩu xác nhận không trùng khớp!");
    else {
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
}
