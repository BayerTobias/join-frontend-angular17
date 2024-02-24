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

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonWithIconComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  addTaskForm: FormGroup;
  selectCategoryOpen: boolean = false;
  categorys: Category[] = [];

  selectedCategory: Category | null = null;

  private fb = inject(FormBuilder);
  public dataManager = inject(DataManagerService);

  constructor() {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
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

  updateCategorysArray(signalData: Category[]) {
    this.categorys = signalData;
  }

  toggleCategoryPicker() {
    this.selectCategoryOpen = !this.selectCategoryOpen;
  }

  setCategory(category: Category) {
    this.selectedCategory = category;
    this.selectCategoryOpen = false;
  }

  addTask() {
    console.log(this.addTaskForm.value);
  }

  resetAddTaskForm() {
    console.log('reset');
  }
}
