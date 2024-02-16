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

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    AuthBaseComponent,
    ButtonWoIconComponent,
    FormsModule,
    ReactiveFormsModule,
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

  signUp() {
    const username = this.signUpForm.value.username;
    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    if (this.signUpForm.valid) {
      console.log(username, email, password);
    } else {
      console.log('nicht valid');
    }

    try {
    } catch (err) {
      console.error(err);
      this.handleError(err);
    }
  }

  handleError(err: any) {}
}
