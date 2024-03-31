import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
  @Output() openAddTaskEvent: EventEmitter<void> = new EventEmitter();
  @Output() openEditContactEvent: EventEmitter<void> = new EventEmitter();
  @Output() deleteContactEvent: EventEmitter<{
    action: boolean;
    delete: boolean;
    id: number;
  }> = new EventEmitter<{ action: boolean; delete: boolean; id: number }>();

  /**
   * Emits an event to open the add task overlay.
   */
  emitOpenAddTask() {
    this.openAddTaskEvent.emit();
  }

  /**
   * Emits an event to open the edit contact overlay.
   */
  emitEditContact() {
    this.openEditContactEvent.emit();
  }

  /**
   * Emits an event to delete the contact and informs about the deletion.
   */
  async deleteContactMobile() {
    this.deleteContactEvent.emit({
      action: true,
      delete: true,
      id: this.currentContact.id,
    });
  }
}
