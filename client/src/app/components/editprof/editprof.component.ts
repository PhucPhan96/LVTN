import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

import { UserService } from './../../services/user.service';
import { User } from './../../models/user.class';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';


@Component({
  selector: 'app-editprof',
  templateUrl: './editprof.component.html',
  styleUrls: ['./editprof.component.css']
})
export class EditprofComponent implements OnInit {
  user: User = new User();
  idUser: String = "";
  email: String = ""
  public subscription: Subscription;
  coverimg: String = "";

  resultUpload: any;
  typeUpdate: String = "";

  public api: String = this.cofig.API;
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3200/api/uploadimg', itemAlias: 'userPhoto' });
  constructor(private router: Router, private userService: UserService, private cofig: Config, private modalService: NgbModal, private http: HttpClient) { }

  ngOnInit() {
    $(function () {
      $('.edit-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
      });
    });

    this.email = localStorage.getItem('user');

    this.getUserByEmail();

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      this.resultUpload = item;
      if (this.typeUpdate == "avatar") {
        this.updateAvatarPath(this.user._id, this.resultUpload.file.name);
      }
      else if (this.typeUpdate == "cover") {
        this.updateCoverPath(this.user._id, this.resultUpload.file.name);
      }
      console.log(this.resultUpload.file.name);
      alert('File uploaded successfully');
      window.location.reload();
    };

  }

  editBasic() {
    this.router.navigateByUrl("/editprof/changeBasicInfo");
  }

  changePass() {
    this.router.navigateByUrl("/editprof/changePass");
  }

  profile() {
    this.router.navigateByUrl("/editprof/basicInfo");
  }

  getUserByEmail() {
    this.subscription = this.userService.getUserByEmail(this.email).subscribe(data => {

      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
      this.user = JSON.parse(JSON.stringify(res.data));
      console.log(this.user);
      this.coverimg = this.api + 'images/' + this.user.coverpath;
      console.log(this.coverimg);
      this.idUser = this.user._id;
    });
  }

  updateAvatarPath(id: String, path: String) {
    this.subscription = this.userService.updateAvatar(id, path).subscribe(data => {
      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
    });
  }

  updateCoverPath(id: String, path: String) {
    this.subscription = this.userService.updateCover(id, path).subscribe(data => {
      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
    });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  openLg2(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  updateAvatar() {
    this.uploader.uploadAll();
    this.typeUpdate = "avatar";
    this.modalService.dismissAll();
  }

  updateCover() {
    this.uploader.uploadAll();
    this.typeUpdate = "cover";
    this.modalService.dismissAll();
  }
}
