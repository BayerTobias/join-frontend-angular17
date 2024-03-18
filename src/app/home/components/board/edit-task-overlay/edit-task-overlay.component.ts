import { Component, Input } from '@angular/core';
import { Task } from '../../../../classes/task.class';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonWithIconComponent } from '../../../../shared/components/buttons/button-with-icon/button-with-icon.component';

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

  editTask: Task | null = null;

  ngOnInit() {
    //erstelle eine kopie vom task
    this.editTask = JSON.parse(JSON.stringify(this.task));

    console.log(this.editTask);
  }

  onCloseOverlay() {
    console.log('close');
  }
}
