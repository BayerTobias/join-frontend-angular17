import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DataManagerService } from '../../services/data-manager.service';
import { ContactComponent } from './contact/contact.component';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { Contact } from '../../../classes/contact.class';
import { CurrentContactDisplayComponent } from './current-contact-display/current-contact-display.component';
import { AddContactOverlayComponent } from './add-contact-overlay/add-contact-overlay.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule,
    ContactComponent,
    ButtonWithIconComponent,
    CurrentContactDisplayComponent,
    AddContactOverlayComponent,
    AddTaskComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  public currentContact: Contact = new Contact();
  public initials: string[] = [];
  public addContactOverlayOpen: boolean = false;
  public addContactOverlayAnimation: boolean = false;
  public addTaskOverlayOpen: boolean = false;
  public addTaskOverlayAnimation: boolean = false;

  public dataManager = inject(DataManagerService);

  @ViewChild('currentContactDiv') currentContactRef!: ElementRef;

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

  toggleAddContactModal(action: string) {
    if (action === 'open') {
      this.addContactOverlayOpen = true;
      setTimeout(() => {
        this.addContactOverlayAnimation = true;
      }, 100);
    } else if (action === 'close') {
      this.addContactOverlayAnimation = false;
      setTimeout(() => {
        this.addContactOverlayOpen = false;
      }, 400);
    }
  }

  toggleAddTaskOverlay(action: string) {
    if (action === 'open') {
      this.addTaskOverlayOpen = true;
      setTimeout(() => {
        this.addTaskOverlayAnimation = true;
      }, 100);
    } else if (action === 'close') {
      this.addTaskOverlayAnimation = false;
      setTimeout(() => {
        this.addTaskOverlayOpen = false;
      }, 300);
    }
  }

  showContact(contact: Contact) {
    const currentContactElement: HTMLElement =
      this.currentContactRef.nativeElement;
    currentContactElement.classList.add('current-contact-animation');
    this.currentContact = contact;
  }
}
