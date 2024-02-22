import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { TaskResponse } from './../../interfaces/tasks/task-response-interface';
import { Task } from '../../classes/task.class';

@Injectable({
  providedIn: 'root',
})
export class DataManagerService {
  public taskSubject$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );

  // public taskSignal = signal<Task[]>([])

  private http = inject(HttpClient);

  constructor() {}

  async getTasks() {
    const url = environment.baseUrl + '/tasks/';

    try {
      const resp = (await lastValueFrom(
        this.http.get(url)
      )) as Array<TaskResponse>;

      const tasks = resp.map((taskData: TaskResponse) => new Task(taskData));
      // this.taskSignal.update(tasks)
      this.taskSubject$.next(tasks);
    } catch (err) {
      console.error(err);
    }
  }
}
