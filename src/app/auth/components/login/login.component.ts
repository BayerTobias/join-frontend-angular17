import { Component, HostListener, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { LoginResponse } from '../../../interfaces/auth/login-response-interface';

import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AuthBaseComponent } from '../auth-base/auth-base.component';
import { ButtonWoIconComponent } from '../../../shared/components/buttons/button-wo-icon/button-wo-icon.component';
import { User } from '../../../classes/user.class';
import { DataManagerService } from '../../../home/services/data-manager.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    AuthBaseComponent,
    ButtonWoIconComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  startAnimation: boolean = false;
  endAnimation: boolean = false;
  passwordIsHidden: boolean = true;

  loginButtonWidth: string = '145px';
  guestLoginButtonWidth: string = 'auto';
  buttonHeight: string = '51px';
  buttonFontSize: string = '21px';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private dataManager = inject(DataManagerService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.updateButtonSize();
  }

  ngAfterViewInit() {
    this.animateLogo();
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
      this.loginButtonWidth = '200px';
      this.guestLoginButtonWidth = '200px';
    } else {
      this.buttonFontSize = '21px';
      this.buttonHeight = '51px';
      this.loginButtonWidth = '145px';
      this.guestLoginButtonWidth = 'auto';
    }
  }

  /**
   * This function animates the logo in the beginning of the login screen.
   *
   */
  animateLogo() {
    setTimeout(() => {
      this.startAnimation = true;
    }, 300);

    setTimeout(() => {
      this.endAnimation = true;
    }, 450 + 300);
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
      this.handleSuccessfullLogin(resp);
    } catch (err) {
      console.error(err);
    }
  }

  async guestLogin() {
    try {
      const resp: LoginResponse = (await this.auth.loginWithEmailAndPassword(
        'TestUser',
        'Test123'
      )) as LoginResponse;
      this.handleSuccessfullLogin(resp);
    } catch (err) {
      console.error(err);
    }
  }

  handleSuccessfullLogin(resp: LoginResponse) {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('user', JSON.stringify(resp.user));
    localStorage.setItem('contacts', JSON.stringify(resp.contacts));
    this.dataManager.loggedInUser = new User(resp.user);
    this.dataManager.userContacts = resp.contacts;
    this.router.navigateByUrl('/home');
  }

  togglePasswordVisibility() {
    this.passwordIsHidden = !this.passwordIsHidden;
  }
}
