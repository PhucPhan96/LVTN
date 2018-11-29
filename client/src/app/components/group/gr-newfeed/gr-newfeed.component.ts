import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Post } from './../../../models/post.class';
import { PostDetail } from './../../../models/postDetail.class';
import { PostService } from './../../../services/post.service';
import { UserService } from './../../../services/user.service';
import { GroupService } from './../../../services/group.service';

import { WebsocketService } from './../../../services/websocket.service';
import { MyResponse } from './../../../models/my_response.class';
import { Subscription } from 'rxjs';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Group } from './../../../models/group.class';
import { CmtPost } from './../../../models/cmtpost.class';
import { Config } from './../../../app.cofig';

@Component({
  selector: 'app-gr-newfeed',
  templateUrl: './gr-newfeed.component.html',
  styleUrls: ['./gr-newfeed.component.css']
})
export class GrNewfeedComponent implements OnInit {
  post: Post = new Post();
  group: Group = new Group();
  cmtPost: CmtPost[] = Array<CmtPost>();
  subcription: Subscription;
  listPost: PostDetail[] = Array<PostDetail>();
  api: String = this.config.API;
  idUser: String = localStorage.getItem('idUser');
  txtComment : String;
  skip : Number = 0;

  resultUpload: any;
  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3200/api/uploadimg', itemAlias: 'userPhoto' });
  constructor(private config: Config, private postService: PostService, private modalService: NgbModal,
    private websocketService: WebsocketService, private userService: UserService, private groupService: GroupService) {

    this.websocketService.newPostReceived().subscribe(data => {
      let newPost = new PostDetail();
      newPost.content = data.content;
      newPost.img_path = data.img_path;
      newPost.time_create = data.time_create;
      this.subcription = this.userService.getUserByID(data.user).subscribe(rs => {
        let res = JSON.parse(JSON.stringify(rs));
        newPost.user = JSON.parse(JSON.stringify(res.msg[0]));
      })
      this.subcription = this.groupService.getGroupByID(data.group).subscribe(result => {
        let gr = JSON.parse(JSON.stringify(result));
        newPost.group = JSON.parse(JSON.stringify(gr.msg[0]));
      })
      this.listPost.splice(0, 0, newPost);
    })

    this.websocketService.newCommentReceived().subscribe(data => {
      let newCmtPost = new CmtPost();
      this.subcription = this.userService.getUserByID(data.user).subscribe(rs => {
        let res = JSON.parse(JSON.stringify(rs));
        newCmtPost.user = JSON.parse(JSON.stringify(res.msg[0]));
      })
      this.subcription = this.postService.getPostByID(data.post).subscribe(result => {
        let gr = JSON.parse(JSON.stringify(result));
        newCmtPost.post = JSON.parse(JSON.stringify(gr.msg[0]));
      })
      newCmtPost.comment = data.comment;
      newCmtPost.time_cmt = data.time_cmt;
      
      this.listPost.forEach(e => {
        if(e._id == data.post){
          e.cmtPost.push(newCmtPost);
        }
      })
    })
  }

  ngOnInit() {
    this.group = JSON.parse(localStorage.getItem('group'));
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.resultUpload = item;
      // this.updateAvatarPath(this.group._id, this.resultUpload.file.name);
      this.post.img_path = this.resultUpload.file.name;
    }
    this.getAllPost(this.group._id, this.skip, 3);
  }

  createPost() {
    this.post.time_create = new Date();
    this.post.group = this.group._id;
    this.post.user = localStorage.getItem('idUser');

    this.websocketService.createNewPost({ content: this.post.content, img_path: this.post.img_path, time_create: this.post.time_create, user: this.post.user, group: this.post.group });
    this.post.content = "";
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  upload() {
    this.uploader.uploadAll();
    this.modalService.dismissAll();
  }

  getAllPost(idGroup: String, skip : Number, limit : Number) {
    this.subcription = this.postService.getAllPost(idGroup, skip, limit).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.listPost.push(element);
      });

      this.listPost.forEach(e => {
        this.subcription = this.postService.getAllCmtPost(e._id).subscribe(data => {
          let ls = JSON.parse(JSON.stringify(data));
          e.cmtPost = ls.msg;
        })
      })
    })
  }

  newCommentSend(event) {
    let time_cmt = new Date();
    this.websocketService.newComment({ user: this.idUser, post: event.post, comment: event.cmt, time_cmt: time_cmt });
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    //In chrome and some browser scroll is given to body tag
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
    if (pos == max) {
      //Do your action here 
      console.log('Da het trang!');
      this.getAllPost(this.group._id, this.listPost.length, 3);
    }
  }
}
