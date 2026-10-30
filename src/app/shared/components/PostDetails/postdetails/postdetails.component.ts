import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../core/services/Posts/posts.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { PostCommentsComponent } from '../../Comments/post-comments/post-comments.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-postdetails',
  imports: [PostCommentsComponent, ReactiveFormsModule, DatePipe],
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

  editing = signal<boolean>(false);
  imageFile!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>('');
  editBody: FormControl = new FormControl();
  editPrivacy: FormControl = new FormControl('public');

  get post(): any {
    return this.postDetail();
  }

  set post(val: any) {
    this.postDetail.set(val);
  }

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

  startUpdating(post?: any): void {
    const targetPost = post || this.postDetail();
    if (targetPost) {
      this.editBody.setValue(targetPost.body);
      this.editPrivacy.setValue(targetPost.privacy);
      this.editing.set(true);
    }
  }

  cancelUpdating(): void {
    this.editing.set(false);
  }

  bookmarkPost(postId?: string): void {
    const id = postId || this.postId() || this.postDetail()?._id;
    if (!id) return;
    this._PostsService.BookmarkUnbookmarkPost(id).subscribe({
      next: (res) => {
        console.log(res.data.bookmarked);
        if (this.postDetail()) {
          const current = this.postDetail();
          current.bookmarked = !current.bookmarked;
          this.postDetail.set({ ...current });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePost(postId?: string): void {
    const id = postId || this.postId() || this.postDetail()?._id || this.postDetail()?.id;
    if (!id) return;
    this._PostsService.DeletePost(id).subscribe({
      next: (res) => {
        console.log('Post deleted:', res);
        this.goBack();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatePost(postId?: string): void {
    const id = postId || this.postId() || this.postDetail()?._id;
    if (!id) return;

    const formData = new FormData();
    if (this.editBody.value) formData.append('body', this.editBody.value);
    if (this.editPrivacy.value) formData.append('privacy', this.editPrivacy.value);
    if (this.imageFile) formData.append('image', this.imageFile);

    this._PostsService.UpdatePost(id, formData).subscribe({
      next: (res) => {
        console.log('Post updated:', res);
        this.editing.set(false);
        this.getPostDetails();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  holdImage(e: Event): void {
    const file = e.target as HTMLInputElement;
    if (file.files && file.files.length > 0) {
      this.imageFile = file.files[0];
      this.readFile();
    }
  }

  readFile(): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.imageFile);
    fileReader.onload = (e) => {
      this.imgUrl.set(e.target?.result);
    };
  }

  goBack(): void {
    this._Location.back();
  }
}
