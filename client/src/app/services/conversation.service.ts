import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { MyResponse } from '../models/my_response.class';
import { Conversation } from '../models/conversation.class';
import { Config } from '../app.cofig';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  public API: String = this.cofig.API;
  public conversation: Conversation = new Conversation();

  constructor(public http: HttpClient, private cofig: Config) { }

  getAllFriendChat(id : String){
    console.log('id ' + id);
    return this.http.get(`${this.API}getAllFriendChat/${id}`);
  }

  getConversation(idCons : String){
    return this.http.get(`${this.API}getConversation/${idCons}`)
  }

  getIDConversation(user_one : String, user_two : String){
    return this.http.get(`${this.API}getIDConversation/${user_one}/${user_two}`);
  }
}
