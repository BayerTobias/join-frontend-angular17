import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from '../../../../classes/task.class';
import { Subtask } from '../../../../classes/subtask.class';
import { DataManagerService } from '../../../services/data-manager.service';

@Component({
  selector: 'app-task-overlay',
  standalone: true,
  imports: [],
  templateUrl: './task-overlay.component.html',
  styleUrl: './task-overlay.component.scss',
})
export class TaskOverlayComponent {
  dataManger = inject(DataManagerService);

  @Input() task: Task = new Task();

  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateSubtask: EventEmitter<{ task: Task }> = new EventEmitter();

  onCloseOverlay() {
    this.closeOverlay.emit();
  }

  updateTask(subtask: Subtask) {
    subtask.complete = !subtask.complete;

    this.updateSubtask.emit({ task: this.task });
  }
}
