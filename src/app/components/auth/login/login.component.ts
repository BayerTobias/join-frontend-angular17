import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { LoginResponse } from '../../../interfaces/login-response-interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

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
    } catch (err) {
      console.error(err);
    }
  }

  guestLogin() {}
}
