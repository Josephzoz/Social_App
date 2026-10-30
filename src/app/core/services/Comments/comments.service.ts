import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private _HttpClient = inject(HttpClient);

  

  GetPostComments(postId: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.baseURl}/posts/${postId}/comments?page=1&limit=10`);
  }

  CreateComment(postId: string, data: FormData): Observable<any> {
    return this._HttpClient.post(`${environment.baseURl}/posts/${postId}/comments`, data)
  }

  DeleteComment(postId: string, commentId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURl}/posts/${postId}/comments/${commentId}`)
  }

  UpdateComment(postId: string, commentId: string, data: FormData): Observable<any> {
    return this._HttpClient.put(`${environment.baseURl}/posts/${postId}/comments/${commentId}`, data)
  }
}
