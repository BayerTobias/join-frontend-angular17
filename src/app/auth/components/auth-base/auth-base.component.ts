import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-base.component.html',
  styleUrl: './auth-base.component.scss',
})
export class AuthBaseComponent {
  startAnimation: boolean = false;
}
