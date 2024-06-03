import { TodoStatus } from "@enums/todo-status.enum";

export interface Todo {
  id: string;
  description: string;
  status: TodoStatus;

  // TODO Bonus: add createdAt, updatedAt, timestamps
}
