import { Component, HostListener, effect, inject, signal } from '@angular/core';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { TaskComponent } from '../../../shared/components/task/task.component';
import { Task } from '../../../classes/task.class';
import { CommonModule } from '@angular/common';
import { DataManagerService } from '../../services/data-manager.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [ButtonWithIconComponent, TaskComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  public todoTasks: Task[] = [];
  public inProgressTasks: Task[] = [];
  public awaitingFeedbackTasks: Task[] = [];
  public doneTasks: Task[] = [];

  currentlyDraggedTask?: Task;
  mobileButton: boolean = false;

  public dataManager = inject(DataManagerService);

  constructor() {
    effect(() => this.filterTasks(this.dataManager.tasksSignal()));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobileButton = window.innerWidth <= 850;
    console.log(window.innerWidth <= 850);
  }

  filterTasks(tasks: Task[]) {
    this.todoTasks = tasks.filter((task: Task) => task.status === 'todo');
    this.inProgressTasks = tasks.filter(
      (task: Task) => task.status === 'in-progress'
    );
    this.awaitingFeedbackTasks = tasks.filter(
      (task: Task) => task.status === 'awaiting-feedback'
    );
    this.doneTasks = tasks.filter((task: Task) => task.status === 'done');
  }

  startDragging(task: Task) {
    this.currentlyDraggedTask = task;
  }

  async moveTo(dorpArea: HTMLDivElement, status: string) {
    if (this.currentlyDraggedTask) {
      this.toggleDropareaHoverEffect(dorpArea, 'remove');
      this.currentlyDraggedTask.status = status;
      this.filterTasks(this.dataManager.tasksSignal());

      await this.dataManager.updateTask(this.currentlyDraggedTask);
    }
  }

  toggleDropareaHoverEffect(dorpArea: HTMLDivElement, action: string) {
    if (action === 'add') dorpArea.classList.add('dragarea-hover');
    if (action == 'remove') dorpArea.classList.remove('dragarea-hover');
  }

  allowDrop(ev: Event, dorpArea: HTMLDivElement) {
    ev.preventDefault();
    this.toggleDropareaHoverEffect(dorpArea, 'add');
  }

  async filterAndUpdate(event: { task: Task }) {
    this.filterTasks(this.dataManager.tasksSignal());
    await this.dataManager.updateTask(event.task);
  }
}
