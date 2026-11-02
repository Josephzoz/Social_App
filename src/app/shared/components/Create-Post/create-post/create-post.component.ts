import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../core/services/Posts/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { IPosts } from '../../../../core/models/iposts.interface';
import { IUserInfo } from '../../../../core/models/iuser-info.interface';
import { AuthService } from '../../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  private _PostsService = inject(PostsService);
  private _AuthService = inject(AuthService);

  imageFile!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>('');

  postBody: FormControl = new FormControl();
  postPrivacy: FormControl = new FormControl('public');
  userInfo?: IUserInfo;

  

  ngOnInit(): void {
    const data = localStorage.getItem('userInfo');
    console.log(data);
    if (data) {
      this.userInfo = JSON.parse(data);
    }
  }

  holdImage(e: Event) {
    let file = e.target as HTMLInputElement;
    if (file.files && file.files.length > 0) {
      console.log(file.files[0]);
      this.imageFile = file.files[0];
      this.readFile();
    }
  }

  readFile() {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.imageFile);
    fileReader.onload = (e) => {
      this.imgUrl.set(e.target?.result);
    };
  }

  createPost(e: SubmitEvent, form: HTMLFormElement) {
    e.preventDefault();
    let formData = new FormData();
    if (this.postBody) formData.append('body', this.postBody.value);
    if (this.imageFile) formData.append('image', this.imageFile);
    if (this.postPrivacy) formData.append('privacy', this.postPrivacy.value);

    this._PostsService.CreatePost(formData).subscribe({
      next: (res) => {
        console.log(res);
        this._PostsService.allPosts()
        this._PostsService.allFeedPosts()
        this._AuthService.allUserPosts(this.userInfo?._id!)
        form.reset();
        this.imgUrl.set(null);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
