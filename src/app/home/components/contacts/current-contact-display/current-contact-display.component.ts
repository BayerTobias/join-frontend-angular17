import { Component, Input } from '@angular/core';
import { Contact } from '../../../../classes/contact.class';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';

@Component({
  selector: 'app-current-contact-display',
  standalone: true,
  imports: [ButtonWithIconComponent],
  templateUrl: './current-contact-display.component.html',
  styleUrl: './current-contact-display.component.scss',
})
export class CurrentContactDisplayComponent {
  @Input() currentContact: Contact = new Contact();
}
