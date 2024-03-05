import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

import { Task } from '../../classes/task.class';
import { Category } from '../../classes/category.class';
import { UserSummary } from '../../classes/user-summary.class';
import { UserSummaryResponse } from '../../interfaces/users/user-summary-response-interface';
import { TaskResponse } from './../../interfaces/tasks/task-response-interface';
import { CategoryResponse } from './../../interfaces/tasks/category-response-interface';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  public tasksSignal: WritableSignal<Task[]> = signal<Task[]>([]);
  public categorysSignal: WritableSignal<Category[]> = signal<Category[]>([]);
  public usersSignal: WritableSignal<UserSummary[]> = signal<UserSummary[]>([]);

  private http = inject(HttpClient);

  constructor() {}

  async getTasks() {
    const url = environment.baseUrl + '/tasks/';
    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<TaskResponse>;
      const tasks = resp.map((taskData: TaskResponse) => new Task(taskData));
      this.updateCategoriesForTasks(tasks);
      this.matchUserIdsWithUsers(tasks);

      this.tasksSignal.set(tasks);
      console.log(tasks);
    } catch (err) {
      console.error(err);
    }
  }

  updateCategoriesForTasks(tasks: Task[]) {
    const categories = this.categorysSignal();

    tasks.forEach((task) => {
      const matchingCategory = categories.find(
        (category) => category.id === task.categoryId
      );
      if (matchingCategory) {
        task.category = matchingCategory;
      }
    });
  }

  matchUserIdsWithUsers(tasks: Task[]) {
    const users = this.usersSignal();

    tasks.forEach((task) => {
      const matchedUsers = task.assignedTo
        .map((userId) => users.find((user) => user.id === userId))
        .filter((user): user is UserSummary => user !== undefined);
      task.assignedToUserSummarys = matchedUsers;
    });
  }

  async createTask(task: Task) {
    const url = environment.baseUrl + '/tasks/';
    const body = task.asPayloadJson();
    console.log('Task created: ', task.asPayloadJson());

    return lastValueFrom(this.http.post(url, body));
  }

  async updateTask(task: Task) {
    const url = environment.baseUrl + '/tasks/' + task.id + '/';
    const body = task.asPayloadJson();

    return lastValueFrom(this.http.patch(url, body));
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
    } catch (err) {
      console.error(err);
    }
  }

  async getUsers() {
    const url = environment.baseUrl + '/users/';

    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<UserSummaryResponse>;

      const users = resp.map(
        (userData: UserSummaryResponse) => new UserSummary(userData)
      );

      this.usersSignal.set(users);
    } catch (err) {
      console.error(err);
    }
  }

  async createCategory(category: Category) {
    const url = environment.baseUrl + '/categorys/';
    const body = category.asJson();

    return lastValueFrom(this.http.post(url, body));
  }
}
