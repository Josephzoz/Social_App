import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { IProfile } from '../../../core/models/iprofile.interface';
import { IPosts } from '../../../core/models/iposts.interface';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  imports: [RouterLink,DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private _AuthService=inject(AuthService)

  profileInfo=signal<IProfile | null>(null)
  myposts=signal<IPosts[]>([])
  myBookmarks=signal<IPosts[]>([])
  activeTab=signal<'posts' | 'saved'>('posts')

  ngOnInit(): void {
    this.getMyProfile()
  }

  getMyProfile(){
    this._AuthService.GetMyProfile().subscribe({
      next:(res)=>{
        console.log(res.data.user)
        this.profileInfo.set(res.data.user)
        if(res.data.user?._id){
          this.getMyPosts(res.data.user._id);
          this.getMyBookmarks()
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  getMyPosts(id:string){
    this._AuthService.GetUserPosts(id).subscribe({
      next:(res)=>{
        console.log(res.data.posts)
        this.myposts.set(res.data.posts)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getMyBookmarks(){
    this._AuthService.GetBookmarks().subscribe({
      next:(res)=>{
        console.log(res.data.bookmarks)
        this.myBookmarks.set(res.data.bookmarks)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
