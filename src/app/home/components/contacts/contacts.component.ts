import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DataManagerService } from '../../services/data-manager.service';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule, ContactComponent],
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
