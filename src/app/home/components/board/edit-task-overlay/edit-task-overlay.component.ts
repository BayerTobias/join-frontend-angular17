import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
} from '@angular/core';
import { Task } from '../../../../classes/task.class';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  private fb = inject(FormBuilder);

  editTaskForm: FormGroup;
  editTask: Task | null = null;
  users: UserSummary[] = [];
  userPickerOpen: boolean = false;
  today: string = new Date().toISOString().split('T')[0];

  prio: string = '';

  constructor() {
    this.editTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });

    effect(() => {
      this.users = this.dataManager.usersSignal();
    });
  }

  ngOnInit() {
    this.editTask = JSON.parse(JSON.stringify(this.task));
    this.updateForm();
  }

  updateForm() {
    this.editTaskForm.patchValue({
      title: this.editTask?.title,
      description: this.editTask?.description,
      date: this.editTask?.dueDate,
    });

    if (this.editTask?.prio) this.prio = this.editTask?.prio;

    console.log(this.prio);
  }

  setPrio(prio: string) {
    this.prio = prio;
  }

  setAssignedUsers(userRef: UserSummary) {
    userRef.checked = !userRef.checked;

    if (this.editTask) {
      this.editTask.assignedToUserSummarys = this.users.filter(
        (user) => user.checked
      );
    }
  }

  saveEditedTask() {
    console.log('Form Data', this.editTaskForm.value);
  }

  toggleUserPicker() {
    this.userPickerOpen = !this.userPickerOpen;

    if (this.editTask && this.editTask.assignedToUserSummarys) {
      for (const user of this.users) {
        const userExists = this.editTask.assignedToUserSummarys.some(
          (assignedUser) => assignedUser.id === user.id
        );

        user.checked = userExists;
      }
    }
  }

  onCloseOverlay() {
    this.dataManager.resetUsersChecked();
    this.closeOverlay.emit();
  }
}
