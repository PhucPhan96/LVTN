import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostDetail } from './../../../../models/postDetail.class';
import { PostService } from './../../../../services/post.service';

import { Config } from './../../../../app.cofig';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post : PostDetail;
  @Output() newComment = new EventEmitter<{}>();
  txtComment : String;
  api: String = this.config.API;
  liked : Boolean = false;
  subcription : Subscription;
  constructor(private config: Config, private postService : PostService) { }

  ngOnInit() {
    this.subcription = this.postService.checkLikePost(localStorage.getItem('idUser'), this.post._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if(res != 'nolike'){
        this.liked = true;
      }
    })
  }

  commentPost(post){
    let emit = {'post' : post, 'cmt': this.txtComment}
    console.log(emit);
    this.newComment.emit(emit);
    this.txtComment = "";
  }

  likeordislike(post){
    if(this.liked == false){
      this.subcription = this.postService.likePost(localStorage.getItem('idUser'), post).subscribe();
      this.liked = true;
    }
    else{
      this.subcription = this.postService.dislikePost(localStorage.getItem('idUser'), post).subscribe();
      this.liked = false;
    }
  }
}
