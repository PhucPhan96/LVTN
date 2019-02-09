import { Component, OnInit, Input } from '@angular/core';
import { CmtPost } from './../../../../models/cmtpost.class';
import { PostService } from './../../../../services/post.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Config } from './../../../../app.cofig';
import { EventEmitterService } from 'src/app/services/event.emitter.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() cmt: CmtPost = new CmtPost();
  api: String = this.config.API;
  isDel: Boolean = false;
  constructor(private config: Config, private modalService: NgbModal, private postService: PostService, private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
  }

  confirm(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  mouseEnter() {
    if (this.cmt.user._id == localStorage.getItem('idUser')) {
      this.isDel = true;
    }
  }

  mouseLeave() {
    this.isDel = false;
  }

  received() {
    this.postService.deleteCmt(this.cmt._id).subscribe();
    this.eventEmitterService.deleteCmt(this.cmt._id);
    this.modalService.dismissAll();
  }

  notReceived() {
    this.modalService.dismissAll();
  }

}
