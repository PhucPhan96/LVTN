import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { ConversationService } from './../../services/conversation.service';
import { Conversation } from './../../models/conversation.class';
import { Message } from './../../models/message.class';
import { User } from './../../models/user.class';
import { Config } from './../../app.cofig';

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

  constructor(private conversationService: ConversationService, private config: Config) { }

  ngOnInit() {
    this.idUser = localStorage.getItem('idUser');
    console.log(this.idUser);
    this.getAllConversation();
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
      this.subscription = this.conversationService.getConversation(res.msg[0]._id).subscribe(rs => {
        this.message = new Array<Message>();
        let res = JSON.parse(JSON.stringify(rs));
        res.msg.forEach((e) => {
          let ev: Message = JSON.parse(JSON.stringify(e));
          this.message.push(ev);
        });
      })
    })
  }
}
