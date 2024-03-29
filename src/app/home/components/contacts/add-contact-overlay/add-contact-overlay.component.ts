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

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get phone() {
    return this.contactForm.get('phone');
  }

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

  async addOrEditContact() {
    if (this.contactForm.valid && this.contact) {
      this.fillContactData();
      console.log('add contact', this.contact);

      if (this.edit) {
        this.editContact();
      } else {
        this.addContact();
      }
    }
  }

  fillContactData() {
    this.contact.name = this.contactForm.value.name;
    this.contact.email = this.contactForm.value.email;
    this.contact.phone = this.contactForm.value.phone;
    if (!this.contact.color) this.contact.color = this.getRandomColor();
    this.contact.initials = this.getInitials();
  }

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

  editContact() {}

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

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

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
