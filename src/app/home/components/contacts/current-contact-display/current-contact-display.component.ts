import { Component, Input } from '@angular/core';
import { Contact } from '../../../../classes/contact.class';

@Component({
  selector: 'app-current-contact-display',
  standalone: true,
  imports: [],
  templateUrl: './current-contact-display.component.html',
  styleUrl: './current-contact-display.component.scss',
})
export class CurrentContactDisplayComponent {
  @Input() currentContact: Contact = new Contact();
}
