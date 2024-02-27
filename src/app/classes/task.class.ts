import { TaskResponse } from './../interfaces/tasks/task-response-interface';
import { Category } from './category.class';
import { Subtask } from './subtask.class';

export class Task {
  title: string;
  description: string;
  category: Category;
  status: string;
  assignedTo: number[] | [];
  dueDate: string;
  prio: string;
  subtasks: Subtask[];

  constructor(data?: TaskResponse) {
    this.title = data?.title || '';
    this.description = data?.description || '';
    // this.category = data?.category || '';
    this.category = new Category() || '';
    this.status = data?.status || '';
    this.assignedTo = data?.assigned_users || [];
    this.dueDate = data?.dueDate || '';
    this.prio = data?.priority || '';
    this.subtasks = data?.subtasks || [];
  }
}
