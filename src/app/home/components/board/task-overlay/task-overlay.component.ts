import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../classes/task.class';

@Component({
  selector: 'app-task-overlay',
  standalone: true,
  imports: [],
  templateUrl: './task-overlay.component.html',
  styleUrl: './task-overlay.component.scss',
})
export class TaskOverlayComponent {
  @Input() task: Task = new Task();

  @Output() closeOverlay: EventEmitter<void> = new EventEmitter<void>();

  onCloseOverlay() {
    this.closeOverlay.emit();
  }
}
