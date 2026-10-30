import { Component, inject, WritableSignal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private _AuthService=inject(AuthService)
  private _Router=inject(Router)

  resMessage:string=''
  islogged:boolean=false
  loginForm: FormGroup = new FormGroup({
   
    email:new FormControl(null,[
      Validators.required,
      Validators.email
    ]),
    
    password:new FormControl(null,[
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ])
  });

  login(){
    this.islogged=true
    if(this.loginForm.valid){
      this._AuthService.SignIn(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('userInfo',JSON.stringify(res.data.user))
        this._Router.navigate(['/feed'])
        // setTimeout(() => {
        //   this._Router.navigate(['/feed'])
        // }, 1000);
      },
      error:(err)=>{
        console.log(err)
        this.resMessage=err.error.message
      }
    })
    }
  }
}
