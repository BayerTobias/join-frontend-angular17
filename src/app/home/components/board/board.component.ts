import {
  Component,
  HostListener,
  QueryList,
  ViewChildren,
  effect,
  inject,
} from '@angular/core';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import { TaskComponent } from '../../../shared/components/task/task.component';
import { Task } from '../../../classes/task.class';
import { CommonModule } from '@angular/common';
import { DataManagerService } from '../../services/data-manager.service';
import { TaskOverlayComponent } from './task-overlay/task-overlay.component';
import { EditTaskOverlayComponent } from './edit-task-overlay/edit-task-overlay.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    ButtonWithIconComponent,
    TaskComponent,
    CommonModule,
    TaskOverlayComponent,
    EditTaskOverlayComponent,
    AddTaskComponent,
    FormsModule,
  ],
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

  public overlayTask: Task | null = null;
  public activeEditTask: Task | null = null;
  public addTaskOverlay: boolean = false;
  public addTaskOverlayAnimation: boolean = false;
  public addTaskOverlayStatus: string | null = null;
  searchTerm: string = '';

  @ViewChildren(TaskComponent) taskComponents?: QueryList<TaskComponent>;

  public dataManager = inject(DataManagerService);

  constructor() {
    effect(() => this.filterTasks(this.dataManager.tasksSignal()));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.mobileButton = window.innerWidth <= 850;
  }

  filterTasks(tasks: Task[]) {
    console.log('signal fired', this.dataManager.tasksSignal());

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
    this.filterTasksSignalInput();

    if (this.taskComponents) {
      const taskComponent = this.taskComponents.find(
        (component) => component.task.id === event.task.id
      );

      if (taskComponent) taskComponent.manageSubtasks();
    }

    await this.dataManager.updateTask(event.task);
  }

  filterTasksSignalInput() {
    this.filterTasks(this.dataManager.tasksSignal());
  }

  openTask(task: Task) {
    this.overlayTask = task;
  }

  openEditTaskOverlay(event: { task: Task }) {
    this.activeEditTask = event.task;
  }

  openAddTaskOverlay(status: string) {
    this.addTaskOverlayStatus = status;
    console.log(status);

    this.addTaskOverlay = true;
    setTimeout(() => {
      this.addTaskOverlayAnimation = true;
    }, 10);
  }

  closeAddTaskOverlay() {
    this.addTaskOverlayAnimation = false;
    setTimeout(() => {
      this.addTaskOverlay = false;
    }, 300);
    this.addTaskOverlayStatus = null;
  }

  searchTask() {
    this.dataManager.tasksSignal.set(this.dataManager.tasks);

    this.dataManager.tasksSignal.update((value) =>
      value.filter(
        (task) =>
          task.title
            .toLocaleLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          task.description
            .toLocaleLowerCase()
            .includes(this.searchTerm.toLowerCase())
      )
    );
  }
}
