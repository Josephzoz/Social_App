import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../core/services/Posts/posts.service';
import { IPosts } from '../../../../../core/models/iposts.interface';
import { PostCommentsComponent } from '../../../../../shared/components/Comments/post-comments/post-comments.component';
import { RouterLink } from '@angular/router';

import { PostsComponent } from '../../../../../shared/components/Posts/posts/posts.component';

@Component({
  selector: 'app-feed-posts',
  imports: [PostCommentsComponent, RouterLink,PostsComponent],
  templateUrl: './feed-posts.component.html',
  styleUrl: './feed-posts.component.css',
})
export class FeedPostsComponent implements OnInit {
  private _PostsService = inject(PostsService);

  posts: WritableSignal<IPosts[]> = signal<IPosts[]>([]);

  ngOnInit(): void {
    this.GetFeedPosts();
  }

  GetFeedPosts() {
    this._PostsService.GetAllPosts().subscribe({
      next: (res) => {
        console.log(res.data.posts);
        this.posts.set(res.data.posts);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }



  getPostDetails(postId:string){
    this._PostsService.GetSinglePost(postId).subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}









  // getPostsLikes(postId:string){
  //   this._PostsService.GetPostlikes(postId).subscribe({
  //     next:(res)=>{
  //       console.log(res)
  //     },
  //     error:(err)=>{
  //       console.log(err)
  //     }
  //   })
  // }