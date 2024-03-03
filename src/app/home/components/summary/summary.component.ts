import { Component, effect, inject, signal } from '@angular/core';
import { SummaryCardComponent } from '../../../shared/components/summary-card/summary-card.component';
import { DataManagerService } from '../../services/data-manager.service';
import { Task } from '../../../classes/task.class';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [SummaryCardComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  tasksInBoard: number = 0;
  tasksInProgress: number = 0;
  tasksAwaitingFeedback: number = 0;
  tasksToDo: number = 0;
  TasksDone: number = 0;
  highPrioTasks: number = 0;

  public dataManager = inject(DataManagerService);

  constructor() {
    effect(() => this.updateCounts(this.dataManager.tasksSignal()));
  }

  ngOnInit() {
    // this.dataManager.taskSubject$.subscribe((tasks: Task[]) => {
    //   this.updateCounts(tasks);
    //   console.log(this.tasksInProgress);
    // });
  }

  updateCounts(tasks: Task[]) {
    this.tasksInBoard = tasks.length;

    const statusCounts: { [key: string]: number } = {};

    tasks.forEach((task) => {
      statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
    });

    this.tasksInProgress = statusCounts['in-progress'] || 0;
    this.tasksAwaitingFeedback = statusCounts['awaiting-feedback'] || 0;
    this.tasksToDo = statusCounts['todo'] || 0;
    this.TasksDone = statusCounts['done'] || 0;
    this.highPrioTasks = tasks.filter((task) => task.prio === 'high').length;
  }
}
