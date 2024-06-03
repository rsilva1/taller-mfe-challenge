import { ShowTodo } from "@components/show-todo/show-todo"
import { ListTodoProps } from "./list-todo.types"

export const ListTodo: React.FC<ListTodoProps> = ({ todos, filterBy }) => {
  if (todos.length === 0) {
    return (
      <p>No todos yet</p>
    )
  }
  return (
    <ul>
      {todos
      .filter((todo) => !filterBy || todo.status === filterBy)
      .map((todo) => (
        <li key={todo.id}>
          <ShowTodo todo={todo} />
        </li>
      ))}
    </ul>
  )
}
