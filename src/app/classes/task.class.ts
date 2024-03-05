import { TaskResponse } from './../interfaces/tasks/task-response-interface';
import { Category } from './category.class';
import { Subtask } from './subtask.class';
import { UserSummary } from './user-summary.class';

export class Task {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  category: Category;
  status: string;
  assignedTo: number[] | [];
  assignedToUserSummarys: UserSummary[] | [];
  dueDate: string;
  prio: string;
  subtasks: Subtask[];

  constructor(data?: TaskResponse) {
    this.id = data?.id || -1;
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.categoryId = data?.category || -1;
    this.category = new Category();
    this.status = data?.status || 'todo';
    this.assignedTo = data?.assigned_users || [];
    this.assignedToUserSummarys = [];
    this.dueDate = data?.dueDate || '';
    this.prio = data?.priority || '';
    this.subtasks = data?.subtasks || [];
  }

  asPayloadJson() {
    return {
      title: this.title,
      description: this.description,
      category: this.categoryId,
      status: this.status,
      assigned_users: this.assignedTo,
      due_date: this.dueDate,
      priority: this.prio,
      subtasks: this.subtasksAsJson(),
    };
  }

  subtasksAsJson() {
    return this.subtasks.map((subtask) => subtask.asJson());
  }
}
