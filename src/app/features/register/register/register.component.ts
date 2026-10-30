import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/Auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService,private _Router:Router){}

  resMessage:string=''
  isSubmitted:boolean=false

  
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[A-Z][a-z]{2,}(?:\s[A-Z][a-z]{2,}){0,3}$/),
    ]),
    username:new FormControl(null,[
      Validators.minLength(3),
      Validators.maxLength(15),
      Validators.pattern(/^[a-z0-9_]{3,15}$/)
    ]),
    email:new FormControl('male',[
      Validators.required,
      Validators.email
    ]),
    dateOfBirth:new FormControl(null,[
      Validators.required
    ]),
    gender:new FormControl(null,[
      Validators.required,
      Validators.pattern(/^(?:male|female)$/)
    ]),
    password:new FormControl(null,[
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
    ]),
    rePassword:new FormControl(null,[
      Validators.required
    ])
  },{validators:[this.confirmPassword]});

  confirmPassword(g:AbstractControl){
    if(g.get('password')?.value===g.get('rePassword')?.value)
      return null
    else{
      return {'missmatch':true}
    }
  }



  register(){
    this.isSubmitted=true
    console.log(this.registerForm.value)
    if(this.registerForm.valid){
      this._AuthService.SignUp(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        setTimeout(() => {
          this._Router.navigate(['/login'])
        }, 1000);
      },
      error:(err)=>{
        console.log(err)
        this.resMessage=err.error.message
      }
    })
    }
  }
}
