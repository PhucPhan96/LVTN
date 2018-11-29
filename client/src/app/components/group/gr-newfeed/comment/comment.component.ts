import { Component, OnInit, Input } from '@angular/core';
import { CmtPost } from './../../../../models/cmtpost.class';

import { Config } from './../../../../app.cofig';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() cmt : CmtPost = new CmtPost();
  api: String = this.config.API;
  constructor(private config: Config) { }

  ngOnInit() {
  }

}
