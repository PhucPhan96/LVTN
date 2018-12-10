import { Component, OnInit } from '@angular/core';
import { Group } from './../../../models/group.class';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from './../../../app.cofig';
import { Subscription } from 'rxjs';
import { GroupService } from './../../../services/group.service';
import { MyResponse } from './../../../models/my_response.class';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-intro-group',
  templateUrl: './intro-group.component.html',
  styleUrls: ['./intro-group.component.css']
})

export class IntroGroupComponent implements OnInit {
  group : Group = new Group();
  api: String = this.config.API;
  public subscription: Subscription;
  resultUpload: any;
  isAdmin : Boolean = false;
  public uploader: FileUploader = new FileUploader({ url: this.api + '/api/uploadimg', itemAlias: 'userPhoto' });
  constructor(private config: Config, private groupService: GroupService, private modalService: NgbModal) { }

  ngOnInit() {
    if(this.group.admin == localStorage.getItem('idUser')){
      this.isAdmin = true;
    }
    else{
      this.isAdmin = false;
    }
    this.group = JSON.parse(localStorage.getItem('group'));
    console.log(this.group);
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      this.resultUpload = item;
      this.updateCoverPath(this.group._id, this.resultUpload.file.name);
      console.log(this.resultUpload.file.name);
      alert('File uploaded successfully');
      window.location.reload();
    }
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  updateCover() {
    this.uploader.uploadAll();
    this.modalService.dismissAll();
  }

  updateCoverPath(id: String, path: String) {
    this.subscription = this.groupService.updateCover(id, path).subscribe(data => {
      let res = new MyResponse<Group>();
      res = JSON.parse(JSON.stringify(data));
      console.log(res);
    });
  }

}
