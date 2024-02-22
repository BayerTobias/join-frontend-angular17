import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { TaskResponse } from './../../interfaces/tasks/task-response-interface';
import { Task } from '../../classes/task.class';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  tasks?: Task[];

  private http = inject(HttpClient);

  constructor() {}

  async getTasks() {
    const url = environment.baseUrl + '/tasks/';

    const resp = (await lastValueFrom(
      this.http.get(url)
    )) as Array<TaskResponse>;

    this.tasks = resp.map((taskData) => new Task(taskData));
  }
}
