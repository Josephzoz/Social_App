import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IPosts } from '../../models/iposts.interface';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _HttpClient=inject(HttpClient)

 



  

   GetAllPosts():Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/posts`)
  }

  GetHomeFeed():Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/posts/feed?only=following&limit=10`)
  }

 

  CreatePost(data:FormData):Observable<any>{
    return this._HttpClient.post(`${environment.baseURl}/posts`,data)
  }

  

  GetSinglePost(postId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/posts/${postId}`)
  }

  GetPostlikes(postId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}//posts/${postId}/likes?page=1&limit=20`)
  }

  // GetSinglePost(post_id:string):Observable<any>{
  //   return this._HttpClient.get(`${environment.baseURl}/posts/${post_id}`)
  // }

  UpdatePost(postId:string,data:FormData):Observable<any>{
    return this._HttpClient.put(`${environment.baseURl}/posts/${postId}`,data)
  }

  DeletePost(postId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURl}/posts/${postId}`)
  }

  LikeUnlikePost(PostId:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseURl}/posts/${PostId}/like`,{})
  }

  BookmarkUnbookmarkPost(postId:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseURl}/posts/${postId}/bookmark`,{})
  }

}