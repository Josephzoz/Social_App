
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { IPosts } from '../../../../core/models/iposts.interface';
import { RouterLink } from '@angular/router';
import { PostCommentsComponent } from '../../Comments/post-comments/post-comments.component';
import { PostsService } from '../../../../core/services/Posts/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-posts',
  imports: [RouterLink, PostCommentsComponent, ReactiveFormsModule,DatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  private _PostsService = inject(PostsService);

  @Input() post!: IPosts;
  userId = signal('');

  editing = signal<boolean>(false);
  imageFile!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>('');
  editBody: FormControl = new FormControl();
  editPrivacy: FormControl = new FormControl('public');

  startUpdating() {
    this.editBody.setValue(this.post.body);
    this.editPrivacy.setValue(this.post.privacy);
    this.editing.set(true);
  }

   

  ngOnInit(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userId.set(JSON.parse(userInfo)._id);
    }
  }

  

  bookmarkPost(postId: string): void {
    this._PostsService.BookmarkUnbookmarkPost(postId).subscribe({
      next: (res) => {
        console.log(res.data.bookmarked);
        this.post.bookmarked = !this.post.bookmarked;
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
