import { TodoStatus } from "@enums/todo-status.enum";
import { Todo } from "@interfaces/todo.interface";

export interface EditTodoStatusProps {
  todo: Todo;
  updateStatus: (todo: Todo, status: TodoStatus) => void;
}
