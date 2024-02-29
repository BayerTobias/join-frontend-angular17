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
    this.category = (data?.category as Category) || '';
    this.status = data?.status || 'todo';
    this.assignedTo = data?.assigned_users || [];
    this.dueDate = data?.dueDate || '';
    this.prio = data?.priority || '';
    this.subtasks = data?.subtasks || [];
  }

  asPayloadJson() {
    return {
      title: this.title,
      description: this.description,
      category: this.category.id,
      status: this.status,
      assigned_users: this.assignedTo,
      due_date: this.dueDate,
      priority: this.prio,
      subtasks: this.subtasks,
    };
  }
}
