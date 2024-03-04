import { Component, effect, inject, signal } from '@angular/core';
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

  public dataManager = inject(DataManagerService);

  constructor() {
    effect(() => this.filterTasks(this.dataManager.tasksSignal()));
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

    console.log(task);
  }

  moveTo(status: string) {
    console.log('moveTo');

    if (this.currentlyDraggedTask) {
      this.currentlyDraggedTask.status = status;
    }

    this.filterTasks(this.dataManager.tasksSignal());

    // tasks[currentlyDraggedElement].status = status;
    // toggleDropareaHoverEffect(status + "-area", "remove");
    // currentlyDraggedElement = null;
    // renderTodos();
    // await uploadTasks();
  }

  toggleDropareaHoverEffect(id: string, action: string) {
    console.log('dragleave');

    // const dragArea = document.getElementById(id);
    // if (action == "remove") dragArea.classList.remove("dragarea-hover");
    // if (action == "add") dragArea.classList.add("dragarea-hover");
  }

  allowDrop(ev: Event, id: string) {
    console.log('dragover');

    ev.preventDefault();
    // this.toggleDropareaHoverEffect(id, 'add');
  }
}
