import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Post } from './../models/post.class';
import { Config } from './../app.cofig';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket : SocketIOClient.Socket;
  api : String = this.config.API;
  constructor(private config : Config) {
    this.socket = io(this.api.toString());
  }

  joinRoom(data) {
    console.log(data);
    this.socket.emit('join', data);
  }

  leaveRoom(data){
    this.socket.emit('leave', data);
  }

  sendMessage(data) {
    console.log(data);
    
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ room : String, author : String, message : String, time_send : Date}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  createNewPost(data){
    console.log(data);
    
    this.socket.emit('post', data);
  }

  newPostReceived() {
    const observable = new Observable<{ content : String, img_path : String, time_create : Date, user : String, group : String}>(observer => {
      this.socket.on('newpost', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  newComment(data){
    console.log(data);
    
    this.socket.emit('comment', data);
  }
  
  newCommentReceived() {
    const observable = new Observable<{ user : String, post : String, comment : String, time_cmt : Date}>(observer => {
      this.socket.on('newComment', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  newItemPlan(data){
    this.socket.emit('itemPlan', data);
  }

  newItemPlanReceived(){
    const observable = new Observable<{ time : Date, work : String, cost : Number, plan : String}>(observer => {
      this.socket.on('newItemPlan', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  addSpendingEvent(data){
    this.socket.emit('spendingevent', data);
  }

  newSpendingEventReceived(){
    const observable = new Observable<{ content : String, quality : Number, unit_price : Number, total: Number, note : String, event : String}>(observer => {
      this.socket.on('newSpendingEvent', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
