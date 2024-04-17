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
import { User } from '../../classes/user.class';
import { Contact } from '../../classes/contact.class';
import { ContactData } from '../../interfaces/contacts/contact-response-interface';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  public tasksSignal: WritableSignal<Task[]> = signal<Task[]>([]);
  public categorysSignal: WritableSignal<Category[]> = signal<Category[]>([]);
  public usersSignal: WritableSignal<UserSummary[]> = signal<UserSummary[]>([]);

  public tasks: Task[] = [];

  public loggedInUser?: User;
  public userContacts?: Contact[];

  private http = inject(HttpClient);

  constructor() {
    this.getUser();
  }

  /**
   * Resets the checked state of all users.
   */
  resetUsersChecked() {
    this.usersSignal().forEach((user) => {
      user.checked = false;
    });
  }

  /**
   * Retrieves the logged-in user from local storage and initializes contacts if available.
   */
  getUser() {
    if (!this.loggedInUser) {
      const user = localStorage.getItem('user');
      const contacts = localStorage.getItem('contacts');

      if (user && contacts) {
        this.loggedInUser = new User(JSON.parse(user));
        const contactsJson = JSON.parse(contacts);
        this.userContacts = contactsJson.map((jsonContact: ContactData) => {
          return new Contact(jsonContact);
        });
      }
    }
  }

  /**
   * Fetches tasks from the server and updates the tasks array.
   */
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
      this.tasks = tasks;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Updates the category property of each task based on the category ID.
   * @param tasks The array of tasks to update.
   */
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

  /**
   * Matches user IDs in tasks with corresponding user objects and assigns them to tasks.
   * @param tasks The array of tasks to update.
   */
  matchUserIdsWithUsers(tasks: Task[]) {
    const users = this.usersSignal();

    tasks.forEach((task) => {
      const matchedUsers = task.assignedTo
        .map((userId) => users.find((user) => user.id === userId))
        .filter((user): user is UserSummary => user !== undefined);
      task.assignedToUserSummarys = matchedUsers;
    });
  }

  /**
   * Creates a new task by sending a POST request to the server.
   * @param task The task object to be created.
   * @returns A promise that resolves with the response from the server.
   */
  async createTask(task: Task) {
    const url = environment.baseUrl + '/tasks/';
    const body = task.asPayloadJson();

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Updates an existing task by sending a PATCH request to the server.
   * @param task The task object to be updated.
   * @returns A promise that resolves with the response from the server.
   */
  async updateTask(task: Task) {
    const url = environment.baseUrl + '/tasks/' + task.id + '/';
    const body = task.asPayloadJson();

    return lastValueFrom(this.http.patch(url, body));
  }

  /**
   * Deletes an existing task by sending a DELETE request to the server.
   * @param task The task object to be deleted.
   * @returns A promise that resolves with the response from the server.
   */
  async deleteTask(task: Task) {
    const url = environment.baseUrl + '/tasks/' + task.id + '/';

    return lastValueFrom(this.http.delete(url));
  }

  /**
   * Retrieves categories from the server by sending a GET request.
   * @returns A promise that resolves with an array of Category objects.
   */
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

  /**
   * Retrieves users from the server by sending a GET request.
   * @returns A promise that resolves with an array of UserSummary objects.
   */
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

  /**
   * Creates a new category by sending a POST request to the server.
   * @param category The category object to be created.
   * @returns A promise that resolves when the category creation is successful.
   */
  async createCategory(category: Category) {
    const url = environment.baseUrl + '/categorys/';
    const body = category.asJson();

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Creates a new contact by sending a POST request to the server.
   * @param contact The contact object to be created.
   * @returns A promise that resolves when the contact creation is successful.
   */
  async createContact(contact: Contact) {
    const url = environment.baseUrl + '/contacts/';
    const body = contact.asJson();

    return lastValueFrom(this.http.post(url, body));
  }

  /**
   * Updates an existing contact by sending a PATCH request to the server.
   * @param contact The contact object to be updated.
   * @returns A promise that resolves when the contact update is successful.
   */
  async updateContact(contact: Contact) {
    const url = environment.baseUrl + '/contacts/' + contact.id + '/';
    const body = contact.asJson();

    return lastValueFrom(this.http.patch(url, body));
  }

  /**
   * Deletes an existing contact by sending a DELETE request to the server.
   * @param contact The contact object to be deleted.
   * @returns A promise that resolves when the contact deletion is successful.
   */
  async deleteContact(contact: Contact) {
    const url = environment.baseUrl + '/contacts/' + contact.id + '/';

    return lastValueFrom(this.http.delete(url));
  }
}
