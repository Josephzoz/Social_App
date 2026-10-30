import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/Auth/auth.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
  private _AuthService = inject(AuthService);

  resMessage: string = '';
  isSubmitted: boolean = false;

  ngOnInit(): void {
  }

  changePasswordForm: FormGroup = new FormGroup(
    {
      password: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
    },
    { validators: [this.confirmPassword] },
  );

  confirmPassword(g: AbstractControl) {
    if (g.get('newPassword')?.value === g.get('rePassword')?.value) return null;
    else {
      return { missmatch: true };
    }
  }

  changePassword() {
    this.isSubmitted = true;
      if (this.changePasswordForm.valid) {
    // 1. Destructure only the fields you want
    const { password, newPassword } = this.changePasswordForm.value;
    console.log(this.changePasswordForm.value);
    if (this.changePasswordForm.valid) {
      this._AuthService.ChangePassword({ password, newPassword }).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.resMessage = err.error.message;
        },
      });
    }
  }
}
}
