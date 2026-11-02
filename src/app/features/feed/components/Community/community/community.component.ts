import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../core/services/Posts/posts.service';
import { IPosts } from '../../../../../core/models/iposts.interface';
import { RouterLink } from '@angular/router';
import { PostsComponent } from '../../../../../shared/components/Posts/posts/posts.component';

@Component({
  selector: 'app-community',
  imports: [RouterLink,PostsComponent],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css',
})
export class CommunityComponent implements OnInit {
  private _PostsService = inject(PostsService);

  // posts:WritableSignal<IPosts[]>=signal<IPosts[]>([])
  posts=this._PostsService.communityPosts

  ngOnInit(): void {
    // this.GetFeedPosts();
    this._PostsService.allPosts()
  }

  GetFeedPosts(){
    this._PostsService.allPosts()

  }
}
