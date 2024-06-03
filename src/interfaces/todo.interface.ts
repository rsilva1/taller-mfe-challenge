import { TodoStatus } from "@enums/todo-status.enum";

export interface Todo {
  description: string;
  status: TodoStatus;
}
