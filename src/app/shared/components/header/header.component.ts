import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DataManagerService } from '../../../home/services/data-manager.service';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public logOutModal: boolean = false;

  private router = inject(Router);
  private auth = inject(AuthService);
  public dataManager = inject(DataManagerService);

  toggleLogOutModal() {
    this.logOutModal = !this.logOutModal;
  }

  logout(event: Event) {
    event.stopPropagation();

    try {
      this.auth.logout();
      this.router.navigateByUrl('/login');
    } catch (err) {
      console.error(err);
    }
  }
}
