import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-contact-overlay',
  standalone: true,
  imports: [CommonModule, ButtonWithIconComponent],
  templateUrl: './add-contact-overlay.component.html',
  styleUrl: './add-contact-overlay.component.scss',
})
export class AddContactOverlayComponent {
  @Input() animation: boolean = false;

  @Output() closeOverlayEvent: EventEmitter<void> = new EventEmitter();

  closeOverlay() {
    this.closeOverlayEvent.emit();
  }
}
