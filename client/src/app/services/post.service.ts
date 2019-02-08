import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MyResponse } from '../models/my_response.class';
import { Observable } from 'rxjs';
import { Config } from '../app.cofig';
import { Post } from '../models/post.class';
import { CmtPost } from '../models/cmtpost.class';
import { PostDetail } from '../models/postDetail.class';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public API: String = this.cofig.API;

  constructor(public http: HttpClient, private cofig: Config) { }

  createPost(post : Post) : Observable<MyResponse<Post>>{
    return this.http.post<MyResponse<Post>>(this.API + 'createPost/', post);
  }

  getAllPost(idGroup : String, skip : Number, limit : Number) : Observable<MyResponse<PostDetail[]>> {
    return this.http.get<MyResponse<PostDetail[]>>(`${this.API}getAllPost/${idGroup}/${skip}/${limit}`);
  }

  getAllCmtPost(idPost : String) {
    return this.http.get(`${this.API}getAllCmtPost/${idPost}`);
  }

  getAllLikePost(idPost : String) : Observable<MyResponse<CmtPost[]>> {
    return this.http.get<MyResponse<CmtPost[]>>(`${this.API}getAllLikePost/${idPost}`);
  }

  getPostByID(idPost : String) : Observable<MyResponse<Post>> {
    return this.http.get<MyResponse<Post>>(`${this.API}getPostByID/${idPost}`);
  }

  getAllPostOfGroup(group : String, skip : Number, limit : Number) : Observable<MyResponse<PostDetail[]>> {
    return this.http.get<MyResponse<PostDetail[]>>(`${this.API}getAllPostOfGroup/${group}/${skip}/${limit}`);
  }
  getAllPostOfUser(id : String) : Observable<MyResponse<Post[]>> {
    return this.http.get<MyResponse<Post[]>>(`${this.API}getAllPostOfUser/${id}`);
  }

  likePost(user : String, post : String){
    var body = {
      user : user,
      post : post
    }
    return this.http.post(this.API + 'likePost/', body);
  }

  dislikePost(user : String, post : String){
    var body = {
      user : user,
      post : post
    }
    return this.http.post(this.API + 'dislikePost/', body);
  }

  checkLikePost(user : String, post : String){
    var body = {
      user : user,
      post : post
    }
    return this.http.post(this.API + 'checkLikePost/', body);
  }
}
