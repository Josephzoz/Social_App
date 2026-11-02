import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { IPosts } from '../../../../../core/models/iposts.interface';
import { PostsService } from '../../../../../core/services/Posts/posts.service';
import { AuthService } from '../../../../../core/services/Auth/auth.service';
import { PostsComponent } from '../../../../../shared/components/Posts/posts/posts.component';
import { IUserInfo } from '../../../../../core/models/iuser-info.interface';

@Component({
  selector: 'app-my-posts',
  imports: [PostsComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
})
export class MyPostsComponent implements OnInit {
  private _AuthService = inject(AuthService);
  

  posts=this._AuthService.userPosts
  userInfo?:IUserInfo
  userId?: string;
  

  ngOnInit(): void {
    
    const data = localStorage.getItem('userInfo');
    console.log(data);
    if (data) {
      this.userInfo = JSON.parse(data);
      this.userId=this.userInfo?._id
      if(this.userId){
        // this.GetMyPosts(this.userId)
        this._AuthService.allUserPosts(this.userId)
      }
      
    }
    // this.GetMyPosts();
    

  }



  GetMyPosts(userId:string){
    this._AuthService.allUserPosts(userId)

  }
}
