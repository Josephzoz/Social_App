import { Component, inject, Input, OnInit, signal, Signal } from '@angular/core';
import { CommentsService } from '../../../../core/services/Comments/comments.service';
import { IComments } from '../../../../core/models/icomments.interface';
import { IUserInfo } from '../../../../core/models/iuser-info.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post-comments',
  imports: [ReactiveFormsModule,DatePipe],
  templateUrl: './post-comments.component.html',
  styleUrl: './post-comments.component.css',
})
export class PostCommentsComponent implements OnInit {
  private _CommentsService=inject(CommentsService)
  @Input() postId:string=''

  postComments=signal<IComments[]>([])
   userInfo?:IUserInfo
   imageFile!: File;
  imgUrl = signal<string | ArrayBuffer | null | undefined>('');

  commentBody: FormControl = new FormControl();
  editingCommentId = signal<string | null>(null);
  editCommentControl: FormControl = new FormControl('');
  editImageFile?: File;
  editImgUrl = signal<string | ArrayBuffer | null | undefined>('');

  ngOnInit(): void {
    this.getPostComments()
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

  createComment(e: SubmitEvent,form:HTMLFormElement) {
    e.preventDefault();
    let formData = new FormData();
    if (this.commentBody) formData.append('content', this.commentBody.value);
    if (this.imageFile) formData.append('image', this.imageFile);

    this._CommentsService.CreateComment(this.postId,formData).subscribe({
      next:(res)=>{
        console.log(res)
        form.reset()
        this.imgUrl.set(null)
        this.getPostComments()
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  getPostComments(){
    this._CommentsService.GetPostComments(this.postId).subscribe({
      next:(res)=>{
        console.log(res.data.comments)
        this.postComments.set(res.data.comments)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  deleteComment(postId: string, commentId: string) {
    this._CommentsService.DeleteComment(postId, commentId).subscribe({
      next: (res) => {
        console.log(res);
        this.getPostComments()
      
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  startEdit(comment: IComments) {
    this.editingCommentId.set(comment._id);
    this.editCommentControl.setValue(comment.content || '');
    this.editImageFile = undefined;
    this.editImgUrl.set(comment.image || null);
  }

  holdEditImage(e: Event) {
    const file = e.target as HTMLInputElement;
    if (file.files && file.files.length > 0) {
      this.editImageFile = file.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.editImageFile);
      fileReader.onload = (event) => {
        this.editImgUrl.set(event.target?.result);
      };
    }
  }

  removeEditImage() {
    this.editImageFile = undefined;
    this.editImgUrl.set(null);
  }

  cancelEdit() {
    this.editingCommentId.set(null);
    this.editCommentControl.reset();
    this.editImageFile = undefined;
    this.editImgUrl.set(null);
  }

  saveEdit(commentId: string) {
    let formData = new FormData();
    if (this.editCommentControl.value) {
      formData.append('content', this.editCommentControl.value);
    }
    if (this.editImageFile) {
      formData.append('image', this.editImageFile);
    }

    this._CommentsService.UpdateComment(this.postId, commentId, formData).subscribe({
      next: (res) => {
        console.log(res);
        this.cancelEdit();
        this.getPostComments();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
