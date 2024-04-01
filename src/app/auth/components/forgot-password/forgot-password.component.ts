import { Component, inject } from '@angular/core';
import { AuthBaseComponent } from '../auth-base/auth-base.component';
import { ButtonWoIconComponent } from '../../../shared/components/buttons/button-wo-icon/button-wo-icon.component';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomValidators } from '../../custom-validators';
import { AuthService } from '../../services/auth.service';
import { SuccessMessageComponent } from '../../../shared/components/success-message/success-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    AuthBaseComponent,
    ButtonWoIconComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SuccessMessageComponent,
    CommonModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: FormControl;
  emailAdress: string = '';

  noUserFound: Boolean = false;
  sending: boolean = false;
  animationOverlay: boolean = false;
  animationStarted: boolean = false;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    this.email = this.fb.control('', [
      Validators.required,
      CustomValidators.emailValidator,
    ]);
  }

  /**
   * Initiates the password reset process by requesting a password reset email.
   * If the email provided is valid, sends a request to reset the password.
   * If successful, animates the password reset overlay and routes the user to the login page.
   * If an error occurs, sets the 'noUserFound' flag to true if the error indicates no account was found with the provided email.
   */
  async requestPasswordResetEmail() {
    if (this.email.valid) {
      try {
        this.sending = true;
        await this.authService.requestPasswordReset(this.email.value);
        this.animateAndRoute();
      } catch (err: any) {
        if (
          err.error.email[0] ===
          "We couldn't find an account associated with that email. Please try a different e-mail address."
        ) {
          this.noUserFound = true;
        } else console.error(err);
        this.sending = false;
      }
    }
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
