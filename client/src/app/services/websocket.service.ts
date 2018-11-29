import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { Post } from './../models/post.class';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket : SocketIOClient.Socket;
  constructor() {
    this.socket = io('http://localhost:3200');
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
}
