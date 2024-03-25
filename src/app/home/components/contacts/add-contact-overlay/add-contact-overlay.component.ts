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

  @Output() closeOverlayEvent: EventEmitter<void> = new EventEmitter();

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

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
    });
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

  closeOverlay() {
    this.closeOverlayEvent.emit();
  }

  addOrEditTask() {
    this.contact.name = this.contactForm.value.name;
    this.contact.email = this.contactForm.value.email;
    this.contact.phone = this.contactForm.value.phone;
    if (!this.contact.color) this.contact.color = this.getRandomColor();
    this.contact.initials = this.getInitials();

    console.log(this.contact);
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
