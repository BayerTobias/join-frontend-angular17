import { Component } from '@angular/core';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  /**
   * Navigates to the previous page in the browser history.
   */
  previousPage() {
    window.history.back();
  }
}
