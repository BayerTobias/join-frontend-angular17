import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DataManagerService } from '../../services/data-manager.service';
import { ContactComponent } from './contact/contact.component';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { Contact } from '../../../classes/contact.class';
import { CurrentContactDisplayComponent } from './current-contact-display/current-contact-display.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactComponent,
    ButtonWithIconComponent,
    CurrentContactDisplayComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  currentContact: Contact = new Contact();

  public dataManager = inject(DataManagerService);

  @ViewChild('currentContactDiv') currentContactRef!: ElementRef;

  initials: string[] = [];

  constructor() {}

  ngOnInit() {
    this.getUniqueInitials();
  }

  getUniqueInitials() {
    const initialsSet = new Set<string>();
    this.dataManager.userContacts?.forEach((contact) => {
      const initial = contact.name.charAt(0).toUpperCase();
      initialsSet.add(initial);
    });
    this.initials = Array.from(initialsSet).sort();
  }

  toggleAddContactModal() {}

  showContact(contact: Contact) {
    const currentContactElement: HTMLElement =
      this.currentContactRef.nativeElement;
    currentContactElement.classList.add('current-contact-animation');
    this.currentContact = contact;
  }
}
