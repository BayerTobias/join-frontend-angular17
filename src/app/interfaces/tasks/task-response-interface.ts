export interface TaskResponse {
  author: number;
  id: number;
  title: string;
  description: string;
  status: string;
  category: {};
  assigned_users: number[] | [];
  dueDate: string;
  priority: string;
  subtasks: [];
}
