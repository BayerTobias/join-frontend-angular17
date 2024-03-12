import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  public dataManager = inject(DataManagerService);

  constructor() {}

  ngOnInit() {
    console.log(this.dataManager.userContacts);
  }
}
