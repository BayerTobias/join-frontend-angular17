import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
} from '@angular/core';
import { ButtonWithIconComponent } from '../../../shared/components/buttons/button-with-icon/button-with-icon.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataManagerService } from '../../services/data-manager.service';
import { Category } from '../../../classes/category.class';
import { CommonModule } from '@angular/common';
import { UserSummary } from '../../../classes/user-summary.class';
import { Subtask } from '../../../classes/subtask.class';
import { Task } from '../../../classes/task.class';
import { Router } from '@angular/router';
import { SuccessMessageComponent } from '../../../shared/components/success-message/success-message.component';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonWithIconComponent,
    CommonModule,
    SuccessMessageComponent,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  categoryColors: string[] = [
    '#8AA4FF',
    '#F00',
    '#2AD300',
    '#FF8A00',
    '#E200BE',
    '#0038FF',
  ];
  createCategoryOpen: boolean = false;
  selectedColor: string | null = null;
  selectCategoryOpen: boolean = false;
  categorys: Category[] = [];
  selectedCategory: Category | null = null;
  userPickerOpen: boolean = false;
  users: UserSummary[] = [];
  selectedUsers: UserSummary[] = [];
  subtasks: Subtask[] = [];
  prio: string = '';
  formSubmitted: boolean = false;
  animateModal: boolean = false;
  addTaskForm: FormGroup;
  today: string = new Date().toISOString().split('T')[0];

  @Input() overlay: boolean = false;
  @Input() taskStatus: string | null = null;

  @Output() closeOverlayEvent: EventEmitter<void> = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  public dataManager = inject(DataManagerService);
  private router = inject(Router);

  sending: boolean = false;

  constructor() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      newCategoryInput: [''],
      subtaskInput: [''],
    });

    effect(() => {
      this.updateCategorysArray(this.dataManager.categorysSignal());
    });
    effect(() => {
      this.updateUsersArray(this.dataManager.usersSignal());
    });
  }

  ngOnDestroy() {
    this.dataManager.resetUsersChecked();
  }

  /**
   * Getter method for the 'title' form control.
   * @returns The 'title' form control.
   */
  get title() {
    return this.addTaskForm.get('title');
  }

  /**
   * Getter method for the 'description' form control.
   * @returns The 'description' form control.
   */
  get description() {
    return this.addTaskForm.get('description');
  }

  /**
   * Getter method for the 'date' form control.
   * @returns The 'date' form control.
   */
  get date() {
    return this.addTaskForm.get('date');
  }

  /**
   * Getter method for the 'newCategoryInput' form control.
   * @returns The 'newCategoryInput' form control.
   */
  get newCategoryInput() {
    return this.addTaskForm.get('newCategoryInput');
  }

  /**
   * Getter method for the 'subtaskInput' form control.
   * @returns The 'subtaskInput' form control.
   */
  get subtaskInput() {
    return this.addTaskForm.get('subtaskInput');
  }

  /**
   * Updates the 'categorys' array with the provided data.
   * @param signalData The data to update the 'categorys' array.
   */
  updateCategorysArray(signalData: Category[]) {
    this.categorys = signalData;
  }

  /**
   * Updates the 'users' array with the provided data.
   * @param signalData The data to update the 'users' array.
   */
  updateUsersArray(signalData: UserSummary[]) {
    this.users = signalData;
  }

  /**
   * Toggles the visibility of the category picker and resets the selected category.
   */
  toggleCategoryPicker(event: Event) {
    event.stopPropagation();

    this.selectedCategory = null;
    this.selectCategoryOpen = !this.selectCategoryOpen;
  }

  /**
   * Sets the selected category and closes the category picker.
   *
   * @param category The category to set as selected.
   */
  setCategory(category: Category) {
    this.selectedCategory = category;
    this.selectCategoryOpen = false;
  }

  /**
   * Opens the create category section.
   */
  openCreateCategory() {
    this.createCategoryOpen = true;
  }

  /**
   * Closes the create category section and resets the selected color.
   */
  closeCreateCategory() {
    this.selectedColor = null;
    this.createCategoryOpen = false;
  }

  /**
   * Adds a new category to the list of categories.
   * If a color and a name are selected, the category is created and added to the list.
   * Finally, the create category section is closed.
   */
  async addNewCategory() {
    let category = new Category();

    if (this.selectedColor && this.newCategoryInput?.value) {
      category.color = this.selectedColor;
      category.name = this.newCategoryInput?.value;

      await this.dataManager.createCategory(category);
      this.categorys.push(category);
      this.closeCreateCategory();
    }
  }

  /**
   * Sets the selected color for the new category.
   *
   * @param color The color selected by the user.
   */
  selectColor(color: string) {
    this.selectedColor = color;
  }

  /**
   * Toggles the visibility of the user picker.
   */
  toggleUserPicker(event: Event) {
    event.stopPropagation();
    this.userPickerOpen = !this.userPickerOpen;
  }

  /**
   * Sets the priority for the task.
   *
   * @param prio The priority value selected by the user.
   */
  setPrio(prio: string) {
    this.prio = prio;
  }

  /**
   * Clears the subtask input field in the form.
   */
  clearSubtaskInput() {
    this.addTaskForm.get('subtaskInput')?.reset();
  }

  /**
   * Adds a new subtask to the list of subtasks.
   */
  addSubtask() {
    let subtask = new Subtask();
    const inputValue: string = this.addTaskForm.get('subtaskInput')?.value;

    if (inputValue) {
      subtask.title = inputValue;
      this.subtasks.push(subtask);
      this.clearSubtaskInput();
    }
  }

  /**
   * Submits the task creation form.
   */
  async addTask() {
    this.formSubmitted = true;

    if (this.formIsValid() && this.selectedCategory !== null) {
      const task = this.createTaskWithData();
      this.sending = true;

      try {
        await this.dataManager.createTask(task);
        await this.dataManager.getTasks();
        if (!this.overlay) this.animateAndRoute();
        else this.animateAndCloseOverlay();
      } catch (err) {
        console.error(err);
        this.addTaskForm.enable();
        this.sending = false;
      }
    } else this.addTaskForm.markAllAsTouched();
  }

  /**
   * Creates a new task object with the form data.
   *
   * @returns A new task object with the form data.
   */
  createTaskWithData() {
    const task = new Task();

    task.title = this.addTaskForm.get('title')?.value;
    task.description = this.addTaskForm.get('description')?.value;
    task.categoryId = this.selectedCategory!.id;
    task.assignedTo = this.getSelectedUserIds();
    task.dueDate = this.addTaskForm.get('date')?.value;
    task.prio = this.prio;
    task.subtasks = this.subtasks;
    if (this.taskStatus) task.status = this.taskStatus;

    return task;
  }

  /**
   * Retrieves the IDs of the selected users.
   *
   * @returns An array of user IDs.
   */
  getSelectedUserIds() {
    const selectedUsers = this.users.filter((user) => user.checked);
    const userIds = selectedUsers.map((user) => user.id);

    return userIds;
  }

  /**
   * Checks if the form is valid.
   *
   * @returns A boolean indicating whether the form is valid.
   */
  formIsValid() {
    return (
      this.addTaskForm.valid &&
      this.selectedCategory !== null &&
      this.users.filter((user) => user.checked).length > 0 &&
      ['high', 'medium', 'low'].includes(this.prio)
    );
  }

  /**
   * Resets the add task form, selected category, priority, and subtasks.
   */
  resetAddTaskForm() {
    this.addTaskForm.reset();
    this.selectedCategory = null;
    this.prio = '';
    this.subtasks = [];
    this.selectedUsers = [];
  }

  /**
   * Animates the modal and routes to the board component after a delay.
   */
  animateAndRoute() {
    this.animateModal = true;
    setTimeout(() => {
      this.router.navigateByUrl('home/board');
    }, 500);
  }

  /**
   * Animates the modal and closes the overlay after a delay.
   */
  animateAndCloseOverlay() {
    this.animateModal = true;
    setTimeout(() => {
      this.closeOverlay();
    }, 500);
  }

  /**
   * Closes the overlay by resetting users checked and emitting the closeOverlayEvent.
   */
  closeOverlay() {
    this.dataManager.resetUsersChecked();
    this.closeOverlayEvent.emit();
  }

  /**
   * Closes any open dropdowns in the current view.
   * Specifically, it closes the user picker and category selection dropdowns.
   */
  closeDropdowns(event: Event) {
    event.stopPropagation();
    this.userPickerOpen = false;
    this.selectCategoryOpen = false;
  }

  /**
   * Toggles the checked status of a user and updates the list of selected users.
   * If the user's `checked` status is toggled to `true`, they are added to the list of selected users.
   * If toggled to `false`, they are removed from the list.
   *
   * @param user - The user whose `checked` status needs to be toggled.
   */
  updateCheckedUsers(user: UserSummary) {
    user.checked = !user.checked;
    this.selectedUsers = this.users.filter((user) => user.checked);
  }
}
