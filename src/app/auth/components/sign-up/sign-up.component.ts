import { Component, HostListener } from '@angular/core';
import { AuthBaseComponent } from '../auth-base/auth-base.component';
import { ButtonWoIconComponent } from '../../../shared/components/button-wo-icon/button-wo-icon.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../custom-validators';
import { CommonModule } from '@angular/common';
import { User } from '../../../classes/user.class';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AuthBaseComponent,
    ButtonWoIconComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  buttonWidth: string = '145px';
  buttonHeight: string = '51px';
  buttonFontSize: string = '21px';

  passwordIsHidden: boolean = true;
  passwordRepeatIsHidden: boolean = true;

  httpErrorCode: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.signUpForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, CustomValidators.emailValidator]],
        password: [
          '',
          [Validators.required, CustomValidators.passwordLengthValidator(6)],
        ],
        passwordRepeat: [
          '',
          [Validators.required, CustomValidators.passwordLengthValidator(6)],
        ],
      },
      { validators: [CustomValidators.passwordMatchValidator] }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateButtonSize();
  }

  updateButtonSize() {
    const width = window.innerWidth;

    if (width < 850) {
      this.buttonFontSize = '16px';
      this.buttonHeight = '45px';
      this.buttonWidth = '200px';
    } else {
      this.buttonFontSize = '21px';
      this.buttonHeight = '51px';
      this.buttonWidth = '145px';
    }
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get passwordRepeat() {
    return this.signUpForm.get('passwordRepeat');
  }

  togglePasswordVisibility() {
    this.passwordIsHidden = !this.passwordIsHidden;
  }

  togglePasswordRepeatVisibility() {
    this.passwordRepeatIsHidden = !this.passwordRepeatIsHidden;
  }

  async signUp() {
    const user = new User();
    user.username = this.username?.value;
    user.email = this.email?.value;
    user.password = this.password?.value;

    if (this.signUpForm.valid) {
      try {
        await this.auth.createUserWithUsernameAndPassword(user);
        console.log(user.toJson);
      } catch (err) {
        console.error(err);
        this.handleError(err);
      }
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }

  handleError(err: any) {}
}
