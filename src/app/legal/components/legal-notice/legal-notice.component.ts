import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {
  private router = inject(Router);

  isNotHomeRoute() {
    return this.router.url === '/legal-notice';
  }

  previousPage() {
    window.history.back();
  }
}
