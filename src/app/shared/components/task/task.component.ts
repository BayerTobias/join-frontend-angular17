import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Task } from '../../../classes/task.class';
import { DataManagerService } from '../../../home/services/data-manager.service';

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

  // ngOnInit() {
  //   console.log(this.dataManager.usersSignal());
  // }
}
