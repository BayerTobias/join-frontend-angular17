import { Component, Input } from '@angular/core';
import { Contact } from '../../../../classes/contact.class';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  @Input() contact: Contact = new Contact();
  @Input() active: boolean = false;
}
