import { Component, effect, inject } from '@angular/core';
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

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonWithIconComponent,
    CommonModule,
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

  subtasks: Subtask[] = [];

  today: string = new Date().toISOString().split('T')[0];
  prio?: string;

  addTaskForm: FormGroup;

  private fb = inject(FormBuilder);
  public dataManager = inject(DataManagerService);

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

  get title() {
    return this.addTaskForm.get('title');
  }

  get description() {
    return this.addTaskForm.get('description');
  }

  get date() {
    return this.addTaskForm.get('date');
  }

  get newCategoryInput() {
    return this.addTaskForm.get('newCategoryInput');
  }

  get subtaskInput() {
    return this.addTaskForm.get('subtaskInput');
  }

  updateCategorysArray(signalData: Category[]) {
    this.categorys = signalData;
  }

  updateUsersArray(signalData: UserSummary[]) {
    this.users = signalData;
  }

  toggleCategoryPicker() {
    this.selectedCategory = null;
    this.selectCategoryOpen = !this.selectCategoryOpen;
  }

  setCategory(category: Category) {
    this.selectedCategory = category;
    this.selectCategoryOpen = false;
  }

  openCreateCategory() {
    this.createCategoryOpen = true;
  }

  closeCreateCategory() {
    this.selectedColor = null;
    this.createCategoryOpen = false;
  }

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

  selectColor(color: string) {
    this.selectedColor = color;
  }

  toggleUserPicker() {
    this.userPickerOpen = !this.userPickerOpen;
  }

  setPrio(prio: string) {
    this.prio = prio;
  }

  clearSubtaskInput() {
    this.addTaskForm.get('subtaskInput')?.reset();
  }

  addSubtask() {
    let subtask = new Subtask();
    const inputValue: string = this.addTaskForm.get('subtaskInput')?.value;

    if (inputValue) {
      subtask.title = inputValue;
      this.subtasks.push(subtask);
      this.clearSubtaskInput();
    }
  }

  addTask() {
    console.log(this.subtasks);

    console.log(this.addTaskForm.value);
  }

  resetAddTaskForm() {
    this.addTaskForm.reset();
  }
}
