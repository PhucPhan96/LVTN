import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostDetail } from './../../../../models/postDetail.class';
import { LikePost } from './../../../../models/likepost.class';
import { PostService } from './../../../../services/post.service';

import { Config } from './../../../../app.cofig';
import { Subscription } from 'rxjs';
import { post } from 'selenium-webdriver/http';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: PostDetail;
  @Output() newComment = new EventEmitter<{}>();
  txtComment: String;
  api: String = this.config.API;
  liked: Boolean = false;
  subcription: Subscription;
  // totalLikes : LikePost[] = Array<LikePost>();
  totalLikes: number = 0;
  totalCmt: number = 0;
  readMore: Boolean = false;

  constructor(private config: Config, private postService: PostService) {
    
   }

  ngOnInit() {
    this.subcription = this.postService.checkLikePost(localStorage.getItem('idUser'), this.post._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if (res.len > 0) {
        this.liked = true;
      }
    })
    this.getAllLikePost(this.post._id);
    this.subcription = this.postService.getAllCmtPost(this.post._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      this.totalCmt = res.len;
    })
  }

  getAllLikePost(id: String) {
    this.postService.getAllLikePost(id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      this.totalLikes = res.len;
      // JSON.parse(JSON.stringify(res.msg)).forEach(element => {
      //   this.totalLikes.push(element);
      // });
    })
  }

  commentPost(post) {
    let emit = { 'post': post, 'cmt': this.txtComment }
    this.newComment.emit(emit);
    this.txtComment = "";
    this.totalCmt += 1;
  }

  likeordislike(post) {
    if (this.liked == false) {
      this.subcription = this.postService.likePost(localStorage.getItem('idUser'), post).subscribe();
      this.liked = true;
      this.totalLikes += 1;
    }
    else {
      this.subcription = this.postService.dislikePost(localStorage.getItem('idUser'), post).subscribe();
      this.liked = false;
      this.totalLikes -= 1;
    }
  }

  seeMore() {
    this.readMore = !this.readMore;
  }
}
