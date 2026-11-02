import { Component, inject, signal, WritableSignal } from '@angular/core';
import { PostsComponent } from '../../../../../shared/components/Posts/posts/posts.component';
import { IPosts } from '../../../../../core/models/iposts.interface';
import { IUserInfo } from '../../../../../core/models/iuser-info.interface';
import { AuthService } from '../../../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-saved',
  imports: [PostsComponent],
  templateUrl: './saved.component.html',
  styleUrl: './saved.component.css',
})
export class SavedComponent {
   private _AuthService = inject(AuthService);
  

  posts=this._AuthService.bookmarks
 
  

  ngOnInit(): void {
    // this.getMyBookmarks()
    this._AuthService.allBookmarkedPosts()
      
    }
    // this.GetMyPosts();
    

    getMyBookmarks(){
    this._AuthService.allBookmarkedPosts()

  }
  }




