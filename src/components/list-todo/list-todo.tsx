import { ShowTodo } from "@components/show-todo/show-todo"
import { ListTodoProps } from "./list-todo.types"

export const ListTodo: React.FC<ListTodoProps> = ({ todos, filterBy }) => {
  const visibleTodos = todos.filter((todo) => !filterBy || todo.status === filterBy)
  if (visibleTodos.length === 0) {
    return (
      <p>No { filterBy } todos yet</p>
    )
  }
  return (
    <ul>
      {todos
      .map((todo) => (
        <li key={todo.id}>
          <ShowTodo todo={todo} />
        </li>
      ))}
    </ul>
  )
}
