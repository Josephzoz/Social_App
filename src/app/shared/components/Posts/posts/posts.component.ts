
import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { IPosts } from '../../../../core/models/iposts.interface';
import { RouterLink } from '@angular/router';
import { PostCommentsComponent } from '../../Comments/post-comments/post-comments.component';
import { PostsService } from '../../../../core/services/Posts/posts.service';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { authGuard } from '../../../../core/guards/Auth/auth-guard';
import { AuthService } from '../../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, PostCommentsComponent, DatePipe,ReactiveFormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private _PostsService = inject(PostsService);
  private _AuthService = inject(AuthService);
  

  @Input() post!: IPosts;
  userId = signal<string>('');
  posts:WritableSignal<IPosts[]>=signal<IPosts[]>([])
  like=signal<boolean>(false)
  // like:boolean=false

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userId.set(JSON.parse(userInfo)._id);
    }
  }
 
  // start edit
  edit=signal<string>('')
  postId:string=''
  updatePostBody:FormControl=new FormControl()
  updatePostPrivacy:FormControl=new FormControl()

  editing(post:IPosts){
    this.edit.set(post._id)
    this.updatePostBody.setValue(post.body)
    this.updatePostPrivacy.setValue(post.privacy)
    this.postId=post._id
  }

  cancelEditing(post:IPosts){
    this.edit.set('')
    this.updatePostBody.setValue(post.body)
    this.updatePostPrivacy.setValue(post.privacy)
    this.postId=''

  }

  // end edit

  getAllPosts(){
    this._PostsService.GetAllPosts().subscribe({
      next:(res)=>{
        console.log(res.data.posts)
        this.posts.set(res.data.posts)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  
  

  bookmarkPost(postId: string): void {
    this._PostsService.BookmarkUnbookmarkPost(postId).subscribe({
      next: (res) => {
        console.log(res.data.bookmarked);
        this.post.bookmarked = !this.post.bookmarked;
        this._PostsService.allPosts()
        this._PostsService.allFeedPosts()
        this._AuthService.allUserPosts(this.userId())
        this._AuthService.allBookmarkedPosts()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePost(postId: string): void {
    this._PostsService.DeletePost(postId).subscribe({
      next: (res) => {
        console.log('Post deleted:', res);
        this._PostsService.allPosts()
        this._PostsService.allFeedPosts()
        this._AuthService.allUserPosts(this.userId())
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatePost(e:SubmitEvent,form:HTMLFormElement){
    e.preventDefault();
    let formData = new FormData();
    if (this.updatePostBody) formData.append('body', this.updatePostBody.value);
    if (this.updatePostPrivacy) formData.append('privacy', this.updatePostPrivacy.value);

    this._PostsService.UpdatePost(this.postId,formData).subscribe({
      next:(res)=>{
        console.log(res)
        form.reset()
        // this._PostsService.allPosts()
        this._PostsService.allPosts()
        this._PostsService.allFeedPosts()
        this._AuthService.allUserPosts(this.userId())
        this.postId=''
        this.edit.set('')
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  likePosts(postId:string){
    this._PostsService.LikeUnlikePost(postId).subscribe({
      next:(res)=>{
        console.log(res)
        this.like.set(res.data.liked)
        this._PostsService.allPosts()
        this._PostsService.allFeedPosts()
        this._AuthService.allUserPosts(this.userId())
        this._AuthService.allBookmarkedPosts()
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

 
}
