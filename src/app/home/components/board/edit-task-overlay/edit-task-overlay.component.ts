import { Component, Input } from '@angular/core';
import { Task } from '../../../../classes/task.class';

@Component({
  selector: 'app-edit-task-overlay',
  standalone: true,
  imports: [],
  templateUrl: './edit-task-overlay.component.html',
  styleUrl: './edit-task-overlay.component.scss',
})
export class EditTaskOverlayComponent {
  @Input() task: Task = new Task();

  onCloseOverlay() {
    console.log('close');
  }
}
