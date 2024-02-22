import { TaskResponse } from './../interfaces/tasks/task-response-interface';

export class Task {
  title: string;
  description: string;
  category: string;
  assignedTo: number[] | [];
  dueDate: string;
  prio: string;
  subtasks: [];

  constructor(data?: TaskResponse) {
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.category = data?.category || '';
    this.assignedTo = data?.assigned_users || [];
    this.dueDate = data?.dueDate || '';
    this.prio = data?.priority || '';
    this.subtasks = data?.subtasks || [];
  }
}
