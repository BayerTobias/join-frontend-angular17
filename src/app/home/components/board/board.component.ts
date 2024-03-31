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

  /**
   * Filters tasks based on their status and assigns them to respective task arrays.
   *
   * @param tasks The tasks to be filtered.
   */
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

  /**
   * Sets the currently dragged task.
   *
   * @param task The task being dragged.
   */
  startDragging(task: Task) {
    this.currentlyDraggedTask = task;
  }

  /**
   * Moves the currently dragged task to the specified drop area status.
   *
   * @param dropArea The HTML element representing the drop area.
   * @param status The status to move the task to.
   */
  async moveTo(dorpArea: HTMLDivElement, status: string) {
    if (this.currentlyDraggedTask) {
      this.toggleDropareaHoverEffect(dorpArea, 'remove');
      this.currentlyDraggedTask.status = status;
      this.filterTasks(this.dataManager.tasksSignal());

      await this.dataManager.updateTask(this.currentlyDraggedTask);
    }
  }

  /**
   * Toggles the hover effect on the drop area.
   *
   * @param dropArea The HTML element representing the drop area.
   * @param action The action to perform ('add' or 'remove').
   */
  toggleDropareaHoverEffect(dorpArea: HTMLDivElement, action: string) {
    if (action === 'add') dorpArea.classList.add('dragarea-hover');
    if (action == 'remove') dorpArea.classList.remove('dragarea-hover');
  }

  /**
   * Handles the 'allowDrop' event to allow dropping items onto the drop area.
   *
   * @param ev The drop event.
   * @param dropArea The HTML element representing the drop area.
   */
  allowDrop(ev: Event, dorpArea: HTMLDivElement) {
    ev.preventDefault();
    this.toggleDropareaHoverEffect(dorpArea, 'add');
  }

  /**
   * Filters tasks and updates them.
   *
   * @param event An object containing the task to be filtered and updated.
   */
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

  /**
   * Filters the tasks and updates the tasks signal.
   */
  filterTasksSignalInput() {
    this.filterTasks(this.dataManager.tasksSignal());
  }

  /**
   * Opens the task overlay with the specified task.
   *
   * @param task The task to be displayed in the overlay.
   */
  openTask(task: Task) {
    this.overlayTask = task;
  }

  /**
   * Opens the edit task overlay with the specified task.
   *
   * @param event An object containing the task to be edited.
   */
  openEditTaskOverlay(event: { task: Task }) {
    this.activeEditTask = event.task;
  }

  /**
   * Opens the add task overlay with the specified status.
   *
   * @param status The status of the task to be added.
   */
  openAddTaskOverlay(status: string) {
    this.addTaskOverlayStatus = status;

    this.addTaskOverlay = true;
    setTimeout(() => {
      this.addTaskOverlayAnimation = true;
    }, 10);
  }

  /**
   * Closes the add task overlay.
   */
  closeAddTaskOverlay() {
    this.addTaskOverlayAnimation = false;
    setTimeout(() => {
      this.addTaskOverlay = false;
    }, 300);
    this.addTaskOverlayStatus = null;
  }

  /**
   * Searches for tasks based on the search term and updates the tasks signal.
   */
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
