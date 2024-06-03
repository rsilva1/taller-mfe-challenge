import { TodoStatus } from "@enums/todo-status.enum";

export interface FilterProps {
  filterBy: TodoStatus | null;
  setFilterBy: React.Dispatch<React.SetStateAction<TodoStatus | null>>;
}
