import { render, screen } from "@testing-library/react"
import { ListTodo } from "./list-todo"
import { makeTodo } from "@tests/utils"
import { TodoStatus } from "@enums/todo-status.enum"

describe('ListTodo', () => {
  test('renders when no todos given', () => {
    render(<ListTodo todos={[]} />)
    const emptyListMessage = screen.getByText('No todos yet')
    expect(emptyListMessage).toBeInTheDocument();
  })

  test('renders when todos given', () => {
    const todos = [
      makeTodo({ status: TodoStatus.Completed }),
      makeTodo({ status: TodoStatus.Incomplete }),
    ];
    render(<ListTodo todos={todos} />)

    const firstTodoDescriptionElement = screen.getByText(todos[0].description)
    expect(firstTodoDescriptionElement).toBeInTheDocument()

    const secondTodoDescriptionElement = screen.getByText(todos[1].description)
    expect(secondTodoDescriptionElement).toBeInTheDocument()
  })
})
