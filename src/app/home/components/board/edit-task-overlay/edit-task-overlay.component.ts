import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
} from '@angular/core';
import { Task } from '../../../../classes/task.class';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { UserSummary } from '../../../../classes/user-summary.class';
import { DataManagerService } from '../../../services/data-manager.service';

@Component({
  selector: 'app-edit-task-overlay',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonWithIconComponent,
  ],
  templateUrl: './edit-task-overlay.component.html',
  styleUrl: './edit-task-overlay.component.scss',
})
export class EditTaskOverlayComponent {
  @Input() task: Task = new Task();
  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>();

  public dataManager = inject(DataManagerService);

  editTask: Task | null = null;

  users: UserSummary[] = [];
  userPickerOpen: boolean = false;

  constructor() {
    effect(() => {
      this.users = this.dataManager.usersSignal();
    });
  }

  ngOnInit() {
    //erstelle eine kopie vom task
    this.editTask = JSON.parse(JSON.stringify(this.task));

    console.log(this.editTask);
  }

  toggleUserPicker() {
    this.userPickerOpen = !this.userPickerOpen;
  }

  onCloseOverlay() {
    this.closeOverlay.emit();
  }
}
