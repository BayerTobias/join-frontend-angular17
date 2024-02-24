import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { TaskResponse } from './../../interfaces/tasks/task-response-interface';
import { CategoryResponse } from './../../interfaces/tasks/category-response-interface';

import { Task } from '../../classes/task.class';
import { Category } from '../../classes/category.class';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  // public taskSubject$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
  //   []
  // );

  public tasksSignal: WritableSignal<Task[]> = signal<Task[]>([]);
  public categorysSignal: WritableSignal<Category[]> = signal<Category[]>([]);

  private http = inject(HttpClient);

  constructor() {}

  async getTasks() {
    const url = environment.baseUrl + '/tasks/';

    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<TaskResponse>;

      const tasks = resp.map((taskData: TaskResponse) => new Task(taskData));
      this.tasksSignal.set(tasks);

      // this.taskSubject$.next(tasks);
    } catch (err) {
      console.error(err);
    }
  }

  async getCategorys() {
    const url = environment.baseUrl + '/categorys/';

    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<CategoryResponse>;

      const categorys = resp.map(
        (categoryData: CategoryResponse) => new Category(categoryData)
      );
      this.categorysSignal.set(categorys);

      // this.taskSubject$.next(tasks);
    } catch (err) {
      console.error(err);
    }
  }
}
