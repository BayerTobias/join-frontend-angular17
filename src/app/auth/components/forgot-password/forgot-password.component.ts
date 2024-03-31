import { Component, inject } from '@angular/core';
import { AuthBaseComponent } from '../auth-base/auth-base.component';
import { ButtonWoIconComponent } from '../../../shared/components/buttons/button-wo-icon/button-wo-icon.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomValidators } from '../../custom-validators';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    AuthBaseComponent,
    ButtonWoIconComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: FormControl;
  emailAdress: string = '';

  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.email = this.fb.control('', [
      Validators.required,
      CustomValidators.emailValidator,
    ]);
  }

  // get email() {
  //   return this.resetForm.get('email');
  // }

  resetPassword() {
    console.log('send Mail', this.email);
  }
}
