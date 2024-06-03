import { TodoStatus } from "@enums/todo-status.enum";
import { Todo } from "./todo.interface";

export interface AppConfig {
  showAddTodo: boolean;
  maxDescriptionLength: number,
  onAdded: (todo: Todo) => Promise<void>|void,
  onStatusUpdated: (todo: Todo, oldStatus: TodoStatus, newStatus: TodoStatus) => Promise<void>|void,
  onError: (err: Error) => Promise<void>|void,
}
