import { User } from './user.class';

interface TaskData {
  title: string;
  description: string;
  category: string;
  assignedTo: User[] | [];
  dueDate: string;
  prio: string;
  subtasks: [];
}

export class Task {
  title: string;
  description: string;
  category: string;
  assignedTo: User[] | [];
  dueDate: string;
  prio: string;
  subtasks: [];

  constructor(data?: TaskData) {
    this.title = data?.title || '';
    this.description = data?.description || '';
    this.category = data?.category || '';
    this.assignedTo = data?.assignedTo || [];
    this.dueDate = data?.dueDate || '';
    this.prio = data?.prio || '';
    this.subtasks = data?.subtasks || [];
  }
}
