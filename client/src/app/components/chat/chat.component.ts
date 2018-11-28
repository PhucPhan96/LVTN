import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ConversationService } from './../../services/conversation.service';
import { WebsocketService } from './../../services/websocket.service';
import { UserService } from './../../services/user.service';
import { Conversation } from './../../models/conversation.class';
import { Message } from './../../models/message.class';
import { User } from './../../models/user.class';
import { Config } from './../../app.cofig';
import * as $ from 'jquery';

// interface listMessage {
//   room : String,
//   author : String,
//   avartar : String,
//   message : String,
//   time_send : Date
// }

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  userCons: User[] = Array<User>();
  idUser: String = "";
  public subscription: Subscription;
  api: String = this.config.API;
  message: Message[] = Array<Message>();
  idCons: String;
  // sended : MessageSend = new MessageSend();
  messSend: String;

  constructor(private conversationService: ConversationService, private userService: UserService, private config: Config, private websocketService: WebsocketService) {
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
      $(".chat-body").animate({ scrollTop: $(document).height() + 9999999999 }, "fast");
    });
  }

  ngOnInit() {
    this.idUser = localStorage.getItem('idUser');
    console.log(this.idUser);
    this.getAllConversation();
    $(".contact-list").animate({ scrollTop: $(document).height() + 9999999999 }, "fast");
    $(".chat-body").animate({ scrollTop: $(document).height() + 9999999999 }, "fast");
    return false;
  }

  getAllConversation() {
    this.subscription = this.conversationService.getAllFriendChat(this.idUser).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      console.log(res.msg);
      res.msg.forEach((e) => {

        if (e.user_one._id == this.idUser) {
          let ev: User = JSON.parse(JSON.stringify(e.user_two));
          this.userCons.push(ev);
        }
        else if (e.user_one._id != this.idUser) {
          let ev: User = JSON.parse(JSON.stringify(e.user_one));
          this.userCons.push(ev);
        }
      });
      this.showAllMessage(this.userCons[0]._id);
      console.log(this.message);

    })
  }

  showAllMessage(id) {
    this.subscription = this.conversationService.getIDConversation(this.idUser, id).subscribe(data => {
      let res = JSON.parse(JSON.stringify(data));
      console.log(res.msg[0]._id);
      this.idCons = res.msg[0]._id;
      this.websocketService.joinRoom(res.msg[0]._id);
      this.subscription = this.conversationService.getConversation(res.msg[0]._id).subscribe(rs => {
        this.message = new Array<Message>();
        let res = JSON.parse(JSON.stringify(rs));
        res.msg.forEach((e) => {
          let ev: Message = JSON.parse(JSON.stringify(e));
          this.message.push(ev);
        });
      })
    })
    $(".chat-body").animate({ scrollTop: $(document).height() + 9999999999 }, "fast");
  }

  sendMessage() {
    this.websocketService.sendMessage({ room: this.idCons, author: this.idUser, message: this.messSend, time_send: Date.now()});
    this.messSend = "";
  }
}
