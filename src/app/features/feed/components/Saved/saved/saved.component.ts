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
  

  posts:WritableSignal<IPosts[]>=signal<IPosts[]>([])
 
  

  ngOnInit(): void {
    this.getMyBookmarks()
      
    }
    // this.GetMyPosts();
    

    getMyBookmarks(){
    this._AuthService.GetBookmarks().subscribe({
      next:(res)=>{
        console.log(res.data.bookmarks)
        this.posts.set(res.data.bookmarks)
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  }




