import { Component } from '@angular/core';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';

@Component({
  selector: 'app-add-contact-overlay',
  standalone: true,
  imports: [ButtonWithIconComponent],
  templateUrl: './add-contact-overlay.component.html',
  styleUrl: './add-contact-overlay.component.scss',
})
export class AddContactOverlayComponent {
  closeOverlay() {
    console.log('close');
  }
}
