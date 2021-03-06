import { Component, OnInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';

import { UserService } from './../../services/user.service';
import { GroupService } from './../../services/group.service';
import { Group } from './../../models/group.class';
import { PostService } from './../../services/post.service';
import { EventService } from './../../services/event.service';
import { Event } from './../../models/event.class';
import { PostDetail } from './../../models/postDetail.class';
import { CmtPost } from './../../models/cmtpost.class';
import { WebsocketService } from './../../services/websocket.service';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event.emitter.service';
@Component({
  selector: 'app-newfeeds',
  templateUrl: './newfeeds.component.html',
  styleUrls: ['./newfeeds.component.css']
})
export class NewfeedsComponent implements OnInit {
  listGroup: Group[] = Array<Group>();
  listPost: PostDetail[] = Array<PostDetail>();
  lsEventComming : Event[] = Array<Event>();
  idUser: String = '';

  public subscription: Subscription;
  api: String = this.config.API;
  skip: Number = 0;

  constructor(private router : Router, private websocketService: WebsocketService, private config: Config, private groupService: GroupService,
     private postService: PostService, private userService : UserService, private eventService : EventService, private eventEmitterService: EventEmitterService) {
      
      this.eventEmitterService.cmtDel.subscribe(data => {
        this.deleteCmt(data);
      });

    this.websocketService.newCommentReceived().subscribe(data => {
      let newCmtPost = new CmtPost();
      this.subscription = this.userService.getUserByID(data.user).subscribe(rs => {
        let res = JSON.parse(JSON.stringify(rs));
        newCmtPost.user = JSON.parse(JSON.stringify(res.msg[0]));
      })
      this.subscription = this.postService.getPostByID(data.post).subscribe(result => {
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
    this.idUser = localStorage.getItem('idUser');
    this.getAllGroupUserJoin(this.idUser);
    this.getEventComingSoon(this.idUser);
  }

  getAllGroupUserJoin(id: String) {
    
    
    this.subscription = this.groupService.getAllGroupUserJoin(id).subscribe(data => {
      
      
      let res = JSON.parse(JSON.stringify(data));
      res.msg.forEach(element => {
        this.listGroup.push(element.group);
      });

      this.subscription = this.groupService.getAllGroupUserAdmin(id).subscribe(rs => {
        let result = JSON.parse(JSON.stringify(rs));
        result.msg.forEach(element => {
          this.listGroup.push(element);
        });
        this.listGroup.forEach(value => {

          this.subscription = this.groupService.getAllMemberGroup(value._id).subscribe(data => {

            let res = JSON.parse(JSON.stringify(data));

            value.member = parseInt(res.count + 1);
          });

          this.subscription = this.postService.getAllPost(value._id, this.skip, 100).subscribe(data => {
            let res = JSON.parse(JSON.stringify(data));

            res.msg.forEach(element => {
              this.listPost.push(element);
            });

            this.listPost.forEach(e => {
              this.subscription = this.postService.getAllCmtPost(e._id).subscribe(data => {
                let ls = JSON.parse(JSON.stringify(data));
                e.cmtPost = ls.msg;
              })
            })
          })
        });
      })
    })
  }

  deleteCmt(id : String){
    this.listPost.forEach(element => {
      element.cmtPost.forEach((e, index) => {
        if(e._id == id){
          element.cmtPost.splice(index, 1);
        }
      });
    });
  }

  newCommentSend(event) {
    let time_cmt = new Date();
    this.websocketService.newComment({ user: this.idUser, post: event.post, comment: event.cmt, time_cmt: time_cmt });
  }

  getEventComingSoon(user : String){
    this.eventService.getAllEventOfUser(user).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      
      res.msg.forEach(element => {
        this.eventService.getEventComingSoon().subscribe(data => {
          let rs = JSON.parse(JSON.stringify(data));
          rs.msg.forEach(e => {
            if(e._id == element.event._id){
              this.lsEventComming.push(e);
            }
          });
        })
      });
      
    })
  }

  gotoEvent(event){
    localStorage.setItem('detailevent', JSON.stringify(event).toString());
    this.router.navigateByUrl('eventdetail/plan');
  }
}
