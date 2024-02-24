import { Component } from '@angular/core';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ButtonWithIconComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {}
