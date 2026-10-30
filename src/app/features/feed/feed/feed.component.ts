import { Component } from '@angular/core';
import { LeftSideComponent } from '../components/Left-side/left-side/left-side.component';
import { RightSideComponent } from '../components/Right-side/right-side/right-side.component';
import { RouterOutlet } from '@angular/router';
import { CreatePostComponent } from '../../../shared/components/Create-Post/create-post/create-post.component';

@Component({
  selector: 'app-feed',
  imports: [LeftSideComponent, RightSideComponent, CreatePostComponent,RouterOutlet],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
