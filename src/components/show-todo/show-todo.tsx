import { TodoStatus } from "@enums/todo-status.enum";
import { ShowTodoProps } from "./show-todo.types";
import './show-todo.css'
import { EditTodoStatus } from "@components/edit-todo-status/edit-todo-status";

const wrapperClass = (status: TodoStatus): string => {
  if (status === TodoStatus.Completed) {
    return 'status-completed'
  } else if (status === TodoStatus.Incomplete) {
    return 'status-incomplete'
  }
  return ''
}

export const ShowTodo: React.FC<ShowTodoProps> = ({ todo }) => {
  const className = wrapperClass(todo.status);
  return (
    <div>
      <EditTodoStatus todo={todo} />
      <p className={className}>
        { todo.description }
      </p>
    </div>
  )
}
