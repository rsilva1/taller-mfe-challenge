import { TodoStatus } from "@enums/todo-status.enum";
import { Todo } from "@interfaces/todo.interface";

export interface ListTodoProps {
  todos: Todo[];
  filterBy?: TodoStatus | null;
}
