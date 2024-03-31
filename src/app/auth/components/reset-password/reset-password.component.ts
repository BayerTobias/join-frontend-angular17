import { Component, inject } from '@angular/core';
import { AuthBaseComponent } from '../auth-base/auth-base.component';
import { ButtonWoIconComponent } from '../../../shared/components/buttons/button-wo-icon/button-wo-icon.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    AuthBaseComponent,
    ButtonWoIconComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  setPasswordForm: FormGroup;
  passwordIsHidden: boolean = true;
  passwordRepeatIsHidden: boolean = true;

  private fb = inject(FormBuilder);

  constructor() {
    this.setPasswordForm = this.fb.group({
      newPassword: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    });
  }

  get newPassword() {
    return this.setPasswordForm.get('newPassword');
  }

  get passwordRepeat() {
    return this.setPasswordForm.get('passwordRepeat');
  }

  togglePasswordVisibility() {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  togglePasswordRepeatVisibility() {
    this.passwordRepeatIsHidden = !this.passwordRepeatIsHidden;
  }

  setNewPassword() {
    console.log(this.setPasswordForm);
  }
}
