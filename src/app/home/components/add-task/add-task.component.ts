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

  addTaskForm: FormGroup;

  private fb = inject(FormBuilder);
  public dataManager = inject(DataManagerService);

  constructor() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      newCategoryInput: [''],
    });

    effect(() => {
      this.updateCategorysArray(this.dataManager.categorysSignal());
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

  updateCategorysArray(signalData: Category[]) {
    this.categorys = signalData;
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
    }
  }

  selectColor(color: string) {
    this.selectedColor = color;
  }

  addTask() {
    console.log(this.addTaskForm.value);
  }

  resetAddTaskForm() {
    console.log('reset');
  }
}
