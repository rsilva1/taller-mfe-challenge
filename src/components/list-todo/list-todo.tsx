import { ShowTodo } from "@components/show-todo/show-todo"
import { ListTodoProps } from "./list-todo.types"

export const ListTodo: React.FC<ListTodoProps> = ({ todos }) => {
  if (todos.length === 0) {
    return (
      <p>No todos yet</p>
    )
  }
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          <ShowTodo todo={todo} />
        </li>
      ))}
    </ul>
  )
}
