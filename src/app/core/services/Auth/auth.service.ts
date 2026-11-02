import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { IPosts } from '../../models/iposts.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _HttpClient=inject(HttpClient)
  private _Router=inject(Router)

  userPosts=signal<IPosts[]>([])
  bookmarks=signal<IPosts[]>([])

  allUserPosts(userId:string){
    this.GetUserPosts(userId).subscribe({
      next:(res)=>{
        this.userPosts.set(res.data.posts)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  allBookmarkedPosts(){
    this.GetBookmarks().subscribe({
      next:(res)=>{
        this.bookmarks.set(res.data.bookmarks)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  SignUp(formData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURl}/users/signup`,formData)
  }

  SignIn(formData:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURl}/users/signin`,formData)
  }

  SignOut(){
    this._Router.navigate(['/login'])
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }

  GetFollowSuggestions():Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/users/suggestions?limit=10`)
  }

  GetUserProfile(userId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/users/${userId}/profile`)
  }

  GetUserPosts(userId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/users/${userId}/posts`)
  }

  GetMyProfile():Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/users/profile-data`)
  }

  GetBookmarks():Observable<any>{
    return this._HttpClient.get(`${environment.baseURl}/users/bookmarks`)
  }

  ChangePassword(formData:object):Observable<any>{
    return this._HttpClient.patch(`${environment.baseURl}/users/change-password`,formData)
  }
}
