import { Component, OnInit } from '@angular/core';

import { EventService } from './../../services/event.service';
import { Event } from './../../models/event.class';

import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';
import { Router } from '@angular/router';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  api: String = this.config.API;
  subscription: Subscription;
  event : Event = new Event();

  resultUpload: any;
  public uploader: FileUploader = new FileUploader({ url: this.api + 'api/uploadimg', itemAlias: 'userPhoto' });

  constructor(private config: Config, private router: Router, private eventService: EventService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.resultUpload = item;
      this.event.imgpath = this.resultUpload.file.name;
    }
  }

  createEvent(event: Event) {
    this.subscription = this.eventService.createEvent(event).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if (!res.error) {
        alert('Tạo thành công!');
        this.subscription = this.eventService.joinEvent(localStorage.getItem('idUser'), res._id).subscribe();
        this.router.navigateByUrl('/groupdetail/newfeed');
      }
      else {
        alert("Thất bại!");
      }
    }, error => {
    });
  }

  create(){
    this.uploader.uploadAll();
    
    this.event.time_create = new Date();
    this.event.user_create = localStorage.getItem('idUser');
    let group = JSON.parse(localStorage.getItem('group'));
    this.event.group = group._id;
    this.event.issummary = false;
    
    this.createEvent(this.event);
  }
}
