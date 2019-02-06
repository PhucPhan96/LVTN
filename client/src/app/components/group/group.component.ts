import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Group } from './../../models/group.class';
import { Subscription } from 'rxjs';
import { Config } from './../../app.cofig';
import { GroupService } from './../../services/group.service';
import { MyResponse } from './../../models/my_response.class';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  group : Group = new Group();
  api: String = this.config.API
  public subscription: Subscription;
  isAdmin : Boolean = false;
  isJoin : Boolean = false;

  resultUpload: any;
  public uploader: FileUploader = new FileUploader({ url: this.api + '/api/uploadimg', itemAlias: 'userPhoto' });

  constructor(private router : Router, private config: Config, private groupService: GroupService, private modalService: NgbModal) { }

  ngOnInit() {
    $(function () {
      $('.list-group').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
      });
    });

    
    // this.idUser = localStorage.getItem('idUser');
    this.group = JSON.parse(localStorage.getItem('group'));
    
    if(this.group.admin == localStorage.getItem('idUser')){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.resultUpload = item;
      this.updateAvatarPath(this.group._id, this.resultUpload.file.name);
      alert('Cập nhật thành công !');
      window.location.reload();
    }
    this.checkUserJoinGroup();
  }

  createEvent(){
    this.router.navigateByUrl('/groupdetail/createEvent');
  }

  updateAvatarPath(id: String, path: String) {
    this.subscription = this.groupService.updateAvatar(id, path).subscribe(data => {
      let res = new MyResponse<Group>();
      res = JSON.parse(JSON.stringify(data));
    });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  updateAvatar() {
    this.uploader.uploadAll();
    this.modalService.dismissAll();
  }

  checkUserJoinGroup() {
    this.groupService.checkUserJoinGroup(localStorage.getItem('idUser'), this.group._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res.len > 0)
        this.isJoin = true;
      else
        this.isJoin = false;
    })
  }

}
