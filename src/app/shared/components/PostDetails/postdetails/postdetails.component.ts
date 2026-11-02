import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../core/services/Posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { PostCommentsComponent } from '../../Comments/post-comments/post-comments.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IPosts } from '../../../../core/models/iposts.interface';


@Component({
  selector: 'app-postdetails',
  imports: [PostCommentsComponent, DatePipe,ReactiveFormsModule], 
  templateUrl: './postdetails.component.html',
  styleUrl: './postdetails.component.css',
})
export class PostdetailsComponent implements OnInit {
  private _PostsService = inject(PostsService);
 

  private _ActivatedRoute = inject(ActivatedRoute);
  private _Location = inject(Location);

  postId: WritableSignal<string> = signal<string>('');
  postDetail: WritableSignal<any> = signal<any>(null);
  userId = signal('');

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userId.set(JSON.parse(userInfo)._id);
    }

    this._ActivatedRoute.paramMap.subscribe((param) => {
      this.postId.set(param.get('id')!);
      this.getPostDetails();
    });
  }


    // start edit
  edit=signal<string>('')
  
  updatePostBody:FormControl=new FormControl()
  updatePostPrivacy:FormControl=new FormControl()

  editing(post:IPosts){
    this.edit.set(post._id)
    this.updatePostBody.setValue(post.body)
    this.updatePostPrivacy.setValue(post.privacy)
   
  }

  cancelEditing(post:IPosts){
    this.edit.set('')
    this.updatePostBody.setValue(post.body)
    this.updatePostPrivacy.setValue(post.privacy)
    

  }

  // end edit

  getPostDetails(): void {
    this._PostsService.GetSinglePost(this.postId()).subscribe({
      next: (res) => {
        console.log(res.data.post);
        this.postDetail.set(res.data.post);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

 

  bookmarkPost(postId: string): void {
    this._PostsService.BookmarkUnbookmarkPost(postId).subscribe({
      next: (res) => {
        console.log(res.data.bookmarked);
        this.getPostDetails()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  

   deletePost(postId: string): void {
    this._PostsService.DeletePost(postId).subscribe({
      next: (res) => {
        console.log(res);
        this._Location.back()
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

    this._PostsService.UpdatePost(this.postId(),formData).subscribe({
      next:(res)=>{
        console.log(res)
        form.reset()
        this.getPostDetails()
        this.postId.set('')
        this.edit.set('')
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  goBack(): void {
    this._Location.back();
  }
}
