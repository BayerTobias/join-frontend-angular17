import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from '../../../../classes/task.class';
import { Subtask } from '../../../../classes/subtask.class';
import { DataManagerService } from '../../../services/data-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-overlay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-overlay.component.html',
  styleUrl: './task-overlay.component.scss',
})
export class TaskOverlayComponent {
  dataManger = inject(DataManagerService);

  @Input() task: Task = new Task();

  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>();
  @Output() openEditOverlay: EventEmitter<{ task: Task }> = new EventEmitter();
  @Output() updateSubtask: EventEmitter<{ task: Task }> = new EventEmitter();
  @Output() taskDeleted: EventEmitter<void> = new EventEmitter();

  onCloseOverlay() {
    this.closeOverlay.emit();
  }

  openEditTaskOverlay() {
    this.closeOverlay.emit();
    this.openEditOverlay.emit({ task: this.task });
  }

  updateTask(subtask: Subtask) {
    subtask.complete = !subtask.complete;

    this.updateSubtask.emit({ task: this.task });
  }

  async deleteTask() {
    try {
      await this.dataManger.deleteTask(this.task);

      const index = this.dataManger
        .tasksSignal()
        .findIndex((task) => task.id === this.task.id);
      if (index !== -1) this.dataManger.tasksSignal().splice(index, 1);

      // this.dataManger.fireTaskSignal();

      // console.log(this.dataManger.tasksSignal());

      this.taskDeleted.emit();

      this.onCloseOverlay();
    } catch (err) {
      console.error(err);
    }
  }
}
