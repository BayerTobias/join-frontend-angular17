import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { LoginResponse } from '../../../interfaces/login-response-interface';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  startAnimation: boolean = false;
  endAnimation: boolean = false;
  passwordIsHidden: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.animateLogo();
  }

  /**
   * This function animates the logo in the beginning of the login screen.
   *
   */
  animateLogo() {
    setTimeout(() => {
      this.startAnimation = true;
    }, 425);

    setTimeout(() => {
      this.endAnimation = true;
    }, 650);
  }

  /**
   * Getter method for the 'email' form control.
   *
   * @returns The 'email' form control.
   */
  get username() {
    return this.loginForm.get('username');
  }

  /**
   * Getter method for the 'password' form control.
   *
   * @returns The 'password' form control.
   */
  get password() {
    return this.loginForm.get('password');
  }

  async login() {
    try {
      const resp: LoginResponse = (await this.auth.loginWithEmailAndPassword(
        this.username?.value,
        this.password?.value
      )) as LoginResponse;
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('');
    } catch (err) {
      console.error(err);
    }
  }

  async guestLogin() {
    try {
      const resp: LoginResponse = (await this.auth.loginWithEmailAndPassword(
        'tbaye',
        'Test123'
      )) as LoginResponse;
      localStorage.setItem('token', resp.token);
      this.router.navigateByUrl('');
    } catch (err) {
      console.error(err);
    }
  }

  togglePasswordVisibility() {
    this.passwordIsHidden = !this.passwordIsHidden;
  }
}
