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
import { Router, RouterModule } from '@angular/router';
import { CustomValidators } from '../../custom-validators';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from '../../../shared/components/success-message/success-message.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    AuthBaseComponent,
    ButtonWoIconComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    SuccessMessageComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  setPasswordForm: FormGroup;
  passwordIsHidden: boolean = true;
  passwordRepeatIsHidden: boolean = true;

  token: string = '';

  sending: boolean = false;
  animationOverlay: boolean = false;
  animationStarted: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.setPasswordForm = this.fb.group(
      {
        password: [
          '',
          [Validators.required, CustomValidators.passwordLengthValidator(8)],
        ],
        passwordRepeat: [
          '',
          [Validators.required, CustomValidators.passwordLengthValidator(8)],
        ],
      },
      { validators: [CustomValidators.passwordMatchValidator] }
    );
  }

  ngOnInit() {
    this.extractTokenFromUrl();
  }

  /**
   * Extracts the token from the current URL.
   */
  extractTokenFromUrl() {
    const url = this.router.url;
    const tokenIndex = url.indexOf('token=');

    if (tokenIndex !== -1) {
      const startIndex = tokenIndex + 'token='.length;

      this.token = url.substring(startIndex, url.length);
      console.log(this.token);
    }
  }

  /**
   * Getter method for the 'password' form control.
   *
   * @returns The 'password' form control.
   */
  get password() {
    return this.setPasswordForm.get('password');
  }

  /**
   * Getter method for the 'passwordRepeat' form control.
   *
   * @returns The 'passwordRepeat' form control.
   */
  get passwordRepeat() {
    return this.setPasswordForm.get('passwordRepeat');
  }

  /**
   * Toggles the visibility of the password field between hidden and visible.
   */
  togglePasswordVisibility() {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  /**
   * Toggles the visibility of the password repeat field between hidden and visible.
   */
  togglePasswordRepeatVisibility() {
    this.passwordRepeatIsHidden = !this.passwordRepeatIsHidden;
  }

  /**
   * Sets a new password if the form is valid.
   * If successful, animates and routes to the login page.
   * If an error occurs, logs the error and stops the loading animation.
   */
  setNewPassword() {
    if (this.setPasswordForm.valid) {
      try {
        this.sending = true;
        this.authService.setNewPassword(this.password?.value, this.token);
        this.animateAndRoute();
      } catch (err) {
        console.error(err);
        this.sending = false;
      }
    } else this.setPasswordForm.markAllAsTouched();
  }

  /**
   * Animates the password reset overlay and routes the user to the login page after a delay.
   */
  animateAndRoute() {
    this.animationOverlay = true;

    setTimeout(() => {
      this.animationStarted = true;
    }, 10);

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 1000);
  }
}
