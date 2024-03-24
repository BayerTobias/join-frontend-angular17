import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataManagerService } from '../../../home/services/data-manager.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public logOutModal: boolean = false;

  public dataManager = inject(DataManagerService);

  toggleLogOutModal() {
    this.logOutModal = !this.logOutModal;
  }

  logout(event: Event) {
    event.stopPropagation();
  }
}
