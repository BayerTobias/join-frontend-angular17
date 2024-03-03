import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Task } from '../../../classes/task.class';
import { DataManagerService } from '../../../home/services/data-manager.service';
import { UserSummary } from '../../../classes/user-summary.class';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  dataManager = inject(DataManagerService);

  @Input() task: Task = new Task();

  ngOnInit() {}

  isUserSummary(user: number | UserSummary): user is UserSummary {
    return typeof user !== 'number' && user !== null;
  }
}
