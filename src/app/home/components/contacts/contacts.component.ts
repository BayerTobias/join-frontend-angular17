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
  public currentContact: Contact | null = new Contact();
  public initials: string[] = [];
  public addContactOverlayOpen: boolean = false;
  public addContactOverlayAnimation: boolean = false;
  public editContactOverlayOpen: boolean = false;
  public editContactOverlayAnimation: boolean = false;
  public addTaskOverlayOpen: boolean = false;
  public addTaskOverlayAnimation: boolean = false;

  public dataManager = inject(DataManagerService);

  @ViewChild('currentContactDiv') currentContactRef!: ElementRef;

  constructor() {}

  ngOnInit() {
    this.getUniqueInitials();
  }

  /**
   * Retrieves unique initials from user contacts and sorts them.
   */
  getUniqueInitials() {
    this.initials = [];
    const initialsSet = new Set<string>();
    this.dataManager.userContacts?.forEach((contact) => {
      const initial = contact.name.charAt(0).toUpperCase();
      initialsSet.add(initial);
    });
    this.initials = Array.from(initialsSet).sort();
  }

  /**
   * Toggles the add contact modal.
   * @param action - Action to perform ('open' or 'close').
   * @param event - Optional event data.
   */
  toggleAddContactModal(
    action: string,
    event?: { action: boolean; delete: boolean; id: number }
  ) {
    if (action === 'open') {
      this.handleOverlayAnimation('open', 'add', 400);
    } else if (action === 'close') {
      if (event?.action) this.focusCreatedContact(event.id);
      this.getUniqueInitials();
      this.handleOverlayAnimation('close', 'add', 400);
    }
  }

  /**
   * Focuses on the created contact after closing the add contact modal.
   * @param id - ID of the created contact.
   */
  focusCreatedContact(id: number) {
    const contact = this.dataManager.userContacts?.find((contact) => {
      return contact.id === id;
    });
    if (contact) this.toggleContact(contact);
  }

  /**
   * Toggles the edit contact modal.
   * @param action - Action to perform ('open' or 'close').
   * @param event - Optional event data.
   */
  toggleEditContactModal(
    action: string,
    event?: { action: boolean; delete: boolean; id: number }
  ) {
    if (action === 'open') {
      this.handleOverlayAnimation('open', 'edit', 400);
    } else if (action === 'close') {
      if (event?.delete) this.handleDeleteContact(event.id);
      this.getUniqueInitials();
      this.handleOverlayAnimation('close', 'edit', 400);
    }
  }

  /**
   * Handles the deletion of a contact.
   * @param id - ID of the contact to delete.
   */
  handleDeleteContact(id: number) {
    this.currentContact = null;
    const index = this.dataManager.userContacts?.findIndex((contact) => {
      return contact.id === id;
    });
    debugger;
    if (index !== undefined && index !== -1) {
      this.dataManager.userContacts?.splice(index, 1);
      localStorage.setItem(
        'contacts',
        JSON.stringify(this.dataManager.userContacts)
      );
    }
  }

  /**
   * Toggles the add task overlay.
   * @param action - Action to perform ('open' or 'close').
   */
  toggleAddTaskOverlay(action: string) {
    if (action === 'open') {
      this.handleOverlayAnimation('open', 'addTask', 400);
    } else if (action === 'close') {
      this.handleOverlayAnimation('close', 'addTask', 400);
    }
  }

  /**
   * Handles overlay animation.
   * @param action - Action to perform ('open' or 'close').
   * @param overlay - Type of overlay ('edit', 'add', 'addTask').
   * @param animationTime - Duration of animation in milliseconds.
   */
  handleOverlayAnimation(
    action: string,
    overlay: string,
    animationTime: number
  ) {
    switch (overlay) {
      case 'edit':
        if (action === 'open') {
          this.editContactOverlayOpen = true;
          setTimeout(() => {
            this.editContactOverlayAnimation = true;
          }, 100);
        } else if (action === 'close') {
          this.editContactOverlayAnimation = false;
          setTimeout(() => {
            this.editContactOverlayOpen = false;
          }, animationTime);
        }
        break;
      case 'add':
        if (action === 'open') {
          this.addContactOverlayOpen = true;
          setTimeout(() => {
            this.addContactOverlayAnimation = true;
          }, 100);
        } else if (action === 'close') {
          this.addContactOverlayAnimation = false;
          setTimeout(() => {
            this.addContactOverlayOpen = false;
          }, animationTime);
        }
        break;
      case 'addTask':
        if (action === 'open') {
          this.addTaskOverlayOpen = true;
          setTimeout(() => {
            this.addTaskOverlayAnimation = true;
          }, 100);
        } else if (action === 'close') {
          this.addTaskOverlayAnimation = false;
          setTimeout(() => {
            this.addTaskOverlayOpen = false;
          }, animationTime);
        }
        break;
      default:
        console.error(`Unbekanntes Overlay: ${overlay}`);
        break;
    }
  }

  /**
   * Toggles the display of a contact and applies animation if specified.
   * @param contact - The contact to toggle.
   */

  toggleContact(contact?: Contact) {
    const currentContactElement: HTMLElement =
      this.currentContactRef.nativeElement;

    if (contact) {
      this.currentContact = contact;
      currentContactElement.classList.add('current-contact-animation');
    } else currentContactElement.classList.remove('current-contact-animation');
  }
}
