import { Component, OnInit } from '@angular/core';
import { CmtPost } from './../../../../models/cmtpost.class';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  cmt : CmtPost = new CmtPost();
  constructor() { }

  ngOnInit() {
  }

}
