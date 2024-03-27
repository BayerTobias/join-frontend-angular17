import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Contact } from '../../../../classes/contact.class';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { DataManagerService } from '../../../services/data-manager.service';

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

  private dataMangager = inject(DataManagerService);

  emitOpenAddTask() {
    this.openAddTaskEvent.emit();
  }

  emitEditContact() {
    this.openEditContactEvent.emit();
  }

  async deleteContactMobile() {
    try {
      this.dataMangager.deleteContact(this.currentContact);
    } catch (err) {
      console.error(err);
    }
  }
}
