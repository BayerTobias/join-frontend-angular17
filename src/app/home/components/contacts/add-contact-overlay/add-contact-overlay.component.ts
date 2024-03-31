import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Contact } from '../../../../classes/contact.class';
import { DataManagerService } from '../../../services/data-manager.service';
import { ContactData } from '../../../../interfaces/contacts/contact-response-interface';

@Component({
  selector: 'app-add-contact-overlay',
  standalone: true,
  imports: [
    CommonModule,
    ButtonWithIconComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-contact-overlay.component.html',
  styleUrl: './add-contact-overlay.component.scss',
})
export class AddContactOverlayComponent {
  @Input() animation: boolean = false;
  @Input() contact: Contact = new Contact();
  @Input() edit: boolean = false;

  @Output() closeOverlayEvent: EventEmitter<{
    action: boolean;
    delete: boolean;
    id: number;
  }> = new EventEmitter<{ action: boolean; delete: boolean; id: number }>();

  colors: string[] = [
    '#008ddc',
    '#ff7827',
    '#a900f8',
    '#502787',
    '#ff63fa',
    '#00d345',
    '#bb051d',
    '#ffc938',
  ];

  contactForm: FormGroup;

  private fb = inject(FormBuilder);
  private dataManager = inject(DataManagerService);

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.edit && this.contact) {
      this.contactForm.patchValue({
        name: this.contact.name,
        email: this.contact.email,
        phone: this.contact.phone,
      });
    }
  }

  /**
   * Getter method for the 'name' form control.
   *
   * @returns The 'name' form control.
   */
  get name() {
    return this.contactForm.get('name');
  }

  /**
   * Getter method for the 'email' form control.
   *
   * @returns The 'email' form control.
   */
  get email() {
    return this.contactForm.get('email');
  }

  /**
   * Getter method for the 'phone' form control.
   *
   * @returns The 'phone' form control.
   */
  get phone() {
    return this.contactForm.get('phone');
  }

  /**
   * Emits an event to close the overlay.
   *
   * @param contactCreateOrEdit Flag indicating if a contact is created or edited.
   * @param deleted Flag indicating if the contact is deleted.
   * @param contactId The ID of the contact.
   */
  closeOverlay(
    contactCreateOrEdit: boolean,
    deleted: boolean,
    contatId: number
  ) {
    this.closeOverlayEvent.emit({
      action: contactCreateOrEdit,
      delete: deleted,
      id: contatId,
    });
  }

  /**
   * Adds or edits a contact based on the form validity and edit mode.
   */
  addOrEditContact() {
    if (this.contactForm.valid && this.contact) {
      this.fillContactData();

      if (this.edit) {
        this.editContact();
      } else {
        this.addContact();
      }
    }
  }

  /**
   * Fills the contact data from the form values.
   */
  fillContactData() {
    this.contact.name = this.contactForm.value.name;
    this.contact.email = this.contactForm.value.email;
    this.contact.phone = this.contactForm.value.phone;
    if (!this.contact.color) this.contact.color = this.getRandomColor();
    this.contact.initials = this.getInitials();
  }

  /**
   * Adds a new contact to the user's contacts.
   */
  async addContact() {
    try {
      const resp: ContactData = await this.dataManager.createContact(
        this.contact
      );
      const serverContact = new Contact(resp);
      this.contact = serverContact;
      this.dataManager.userContacts?.push(serverContact);
      localStorage.setItem(
        'contacts',
        JSON.stringify(this.dataManager.userContacts)
      );
      this.closeOverlay(true, false, serverContact.id);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Edits an existing contact.
   */
  editContact() {
    try {
      this.dataManager.updateContact(this.contact);
      localStorage.setItem(
        'contacts',
        JSON.stringify(this.dataManager.userContacts)
      );
      this.closeOverlay(true, false, this.contact.id);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Deletes the selected contact.
   */
  async deleteContact() {
    if (this.contact) {
      try {
        await this.dataManager.deleteContact(this.contact);
        this.closeOverlay(true, true, this.contact.id);
      } catch (err) {
        console.error(err);
      }
    }
  }

  /**
   * Generates a random color from the available colors.
   */
  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  /**
   * Gets the initials from the contact's name.
   */
  getInitials() {
    const names = this.contactForm.value.name.toUpperCase().trim().split(' ');

    if (names.length === 1) return names[0].charAt(0);
    else {
      const firstLetter = names[0].charAt(0);
      const lastLetter = names[names.length - 1].charAt(0);
      return firstLetter + lastLetter;
    }
  }
}
