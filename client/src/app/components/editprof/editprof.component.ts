import { Component, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';

import { UserService } from './../../services/user.service';
import { FriendService } from './../../services/friend.service';
import { EventEmitterService } from './../../services/event.emitter.service';
import { User } from './../../models/user.class';
import { Subscription } from 'rxjs';
import { MyResponse } from './../../models/my_response.class';
import { Config } from './../../app.cofig';
import { ConversationService } from 'src/app/services/conversation.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Message } from 'src/app/models/message.class';
import { Conversation } from 'src/app/models/conversation.class';


@Component({
  selector: 'app-editprof',
  templateUrl: './editprof.component.html',
  styleUrls: ['./editprof.component.css']
})
export class EditprofComponent implements OnInit {
  user: User = new User();
  idUser: String = "";
  email: String = "";
  public subscription: Subscription;
  coverimg: String = "";
  isFriend: Boolean = false;
  message: Message[] = Array<Message>();
  idCons: String;
  messSend: String;
  userLogin: String = localStorage.getItem('idUser');
  isChat: Boolean = false;

  resultUpload: any;
  typeUpdate: String = "";
  isProfile: String = "";

  public api: String = this.cofig.API;
  public uploader: FileUploader = new FileUploader({ url: this.api + '/api/uploadimg', itemAlias: 'userPhoto' });

  constructor(private conversationService: ConversationService, private _eventEmitter: EventEmitterService,
    private router: Router, private userService: UserService, private cofig: Config,
    private modalService: NgbModal, private http: HttpClient, private friendService: FriendService,
    private websocketService: WebsocketService) {
    this._eventEmitter.dataStr.subscribe(data => {
      this.setEmail(data);
      if (data == localStorage.getItem('user')) {
        this.isProfile = 'user';
      }
      else {
        this.isProfile = 'friend';
      }
      $('.info').addClass('active').siblings().removeClass('active');
    });

    this.websocketService.newMessageReceived().subscribe(data => {
      let newMessage = new Message();
      this.subscription = this.conversationService.getConversationByID(data.room).subscribe(data => {
        let res = JSON.parse(JSON.stringify(data));
        newMessage.conversation = JSON.parse(JSON.stringify(res.msg[0]));
      })
      this.subscription = this.userService.getUserByID(data.author).subscribe(data => {
        let res = JSON.parse(JSON.stringify(data));
        newMessage.author = JSON.parse(JSON.stringify(res.msg[0]));
      })
      newMessage.message = data.message;
      newMessage.time_send = data.time_send;
      this.message.push(newMessage);
      this.scrollbottom(".chat-body");
    });

    this.websocketService.newConversationReceived().subscribe(data => {
      this.conversationService.getIDConversation(data.user_one, data.user_two).subscribe(data => {
        let res = JSON.parse(JSON.stringify(data));
        this.idCons = res.msg[0]._id;
        console.log(this.idCons);

      })
    })


  }

  ngOnInit() {
    $(function () {
      $('.edit-menu').on('click', 'li', function () {
        $(this).addClass('active').siblings().removeClass('active');
      });
    });

    this.isProfile = localStorage.getItem('profile');

    if (this.isProfile == 'user') {
      this.email = localStorage.getItem('user');
      // this.changeEmail()
    }
    else if (this.isProfile == 'friend') {
      this.email = localStorage.getItem('friendemail');
    }
    this.getUserByEmail();
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.resultUpload = item;
      if (this.typeUpdate == "avatar") {
        this.updateAvatarPath(this.user._id, this.resultUpload.file.name);
      }
      else if (this.typeUpdate == "cover") {
        this.updateCoverPath(this.user._id, this.resultUpload.file.name);
      }
      alert('Cập nhật thành công !');
      window.location.reload();
      // this.router.navigateByUrl('/editprof/basicInfo');
    };
  }

  scrollbottom(string: String) {
    $(document).ready(function () {
      $(string).animate({ scrollTop: $(document).height() + 9999999999 });
      return false;
    });
  }

  // addConversation(user_one : String, user_two){
  //   let cons = new Conversation();
  //   this.userService.getUserByID(user_one).subscribe(data => {
  //     let res = JSON.parse(JSON.stringify(data));
  //     cons.user_one = res.msg;
  //     console.log(cons.user_one);

  //   });

  //   this.userService.getUserByID(user_two).subscribe(data => {
  //     let res = JSON.parse(JSON.stringify(data));
  //     cons.user_two = res.msg;
  //     console.log(cons.user_two);
  //   });
  //   // console.log(cons);

  //   this.conversationService.addConversation(cons).subscribe();
  // }

  showAllMessage() {
    this.subscription = this.conversationService.getIDConversation(localStorage.getItem('idUser'), this.user._id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      if (res.msg.length == 0) {
        // this.addConversation(localStorage.getItem('idUser'), this.user._id);
        this.websocketService.addNewConversation({ user_one: localStorage.getItem('idUser'), user_two: this.user._id });
        this.websocketService.leaveRoom(this.idCons);
        this.websocketService.joinRoom(this.idCons);
        this.subscription = this.conversationService.getConversation(this.idCons).subscribe(rs => {
          let res = JSON.parse(JSON.stringify(rs));
          res.msg.forEach((e) => {
            this.message.push(e);
          });
        })
      }
      else {
        this.websocketService.leaveRoom(res.msg[0]._id);
        this.idCons = res.msg[0]._id;
        this.websocketService.joinRoom(res.msg[0]._id);
        this.subscription = this.conversationService.getConversation(res.msg[0]._id).subscribe(rs => {
          let res = JSON.parse(JSON.stringify(rs));
          res.msg.forEach((e) => {
            this.message.push(e);
          });
        })
      }

    })
    this.scrollbottom(".chat-body");
  }

  // onActivate(elementRef) {
  //   console.log('vo day');

  //   setTimeout(() => {
  //   // console.log(elementRef.email);
  //     this.setEmail(elementRef.email);
  //     if(elementRef.email == localStorage.getItem('user')){
  //       this.isProfile = 'user';
  //     }
  //     else{
  //       this.isProfile = 'friend';
  //     }
  //     // $('.info').addClass('active').siblings().removeClass('active');
  //   }, 200);

  // }

  setEmail(email) {
    this.email = email;
    this.getUserByEmail();
  }

  editBasic() {
    this.router.navigateByUrl("/editprof/changeBasicInfo");
  }

  changePass() {
    this.router.navigateByUrl("/editprof/changePass");
  }

  profile() {
    this.router.navigateByUrl("/editprof/basicInfo");
  }

  getUserByEmail() {
    this.subscription = this.userService.getUserByEmail(this.email).subscribe(data => {
      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
      this.user = JSON.parse(JSON.stringify(res.data));
      this.coverimg = this.api + 'images/' + this.user.coverpath;
      this.idUser = this.user._id;
      this.checkFriend(this.user._id, localStorage.getItem('idUser'));
    });
  }

  updateAvatarPath(id: String, path: String) {
    this.subscription = this.userService.updateAvatar(id, path).subscribe(data => {
      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
    });
  }

  updateCoverPath(id: String, path: String) {
    this.subscription = this.userService.updateCover(id, path).subscribe(data => {
      let res = new MyResponse<User>();
      res = JSON.parse(JSON.stringify(data));
    });
  }

  checkFriend(user_one: String, user_two: String) {
    this.subscription = this.friendService.checkFriend(user_one, user_two).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));

      if (res.msg == "OK")
        this.isFriend = true;
      else
        this.isFriend = false;
    })
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  openLg2(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  updateAvatar() {
    this.uploader.uploadAll();
    this.typeUpdate = "avatar";
    this.modalService.dismissAll();
  }

  updateCover() {
    this.uploader.uploadAll();
    this.typeUpdate = "cover";
    this.modalService.dismissAll();
  }

  listFriend() {
    this.router.navigateByUrl('/editprof/listFriend');
  }

  listMutualFriend(){
    this.router.navigateByUrl('/editprof/mutualFriend');
  }

  addOrUnfriend() {
    if (this.isFriend == true) {
      this.friendService.unFriend(this.user._id, localStorage.getItem('idUser')).subscribe();
      this.isFriend = false;
    }
    else {
      this.friendService.addFriend(this.user._id, localStorage.getItem('idUser'), 'friend').subscribe();
      this.isFriend = true;
    }
  }

  chat() {
    if (this.isChat == false) {
      this.isChat = true;
    }
    this.showAllMessage();
  }

  clossMessBox() {
    this.isChat = false;
  }

  sendMessage() {
    this.websocketService.sendMessage({ room: this.idCons, author: this.userLogin, message: this.messSend, time_send: Date.now() });
    this.messSend = "";
  }
}
