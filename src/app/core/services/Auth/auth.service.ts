import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _HttpClient=inject(HttpClient)
  private _Router=inject(Router)

  // header:object={
  //   headers:{
  //     token:localStorage.getItem('token')!
  //   }
  // }

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
