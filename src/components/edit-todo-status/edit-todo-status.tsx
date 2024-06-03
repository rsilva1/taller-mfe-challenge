import { TodoStatus } from "@enums/todo-status.enum";
import { EditTodoStatusProps } from "./edit-todo-status.types";
import { useContext } from "react";
import { TodosDispatcherContext } from "todos-dispatcher-context";
import { ActionTypes } from "reducers/todo.reducer";

export const EditTodoStatus: React.FC<EditTodoStatusProps> = ({ todo }) => {
  const dispatch = useContext(TodosDispatcherContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked
      ? TodoStatus.Completed
      : TodoStatus.Incomplete;
    dispatch({
      type: ActionTypes.UpdateStatus,
      payload: {
        id: todo.id,
        status: newStatus,
      },
    });
  }

  return (
    <input
      type="checkbox"
      checked={todo.status === TodoStatus.Completed}
      onChange={handleChange}
    />
  )
}
