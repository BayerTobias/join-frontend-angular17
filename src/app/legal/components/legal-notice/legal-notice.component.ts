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

  /**
   * Checks if the current route is not the home route.
   * @returns A boolean indicating whether the current route is not the home route.
   */
  isNotHomeRoute() {
    return this.router.url === '/legal-notice';
  }

  /**
   * Navigates to the previous page in the browser history.
   */
  previousPage() {
    window.history.back();
  }
}
