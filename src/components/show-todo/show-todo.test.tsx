import { TodoStatus } from "@enums/todo-status.enum"
import { ShowTodo } from "./show-todo"
import { render, screen } from "@testing-library/react"
import { makeTodo } from "@tests/utils"

describe('ShowTodo', () => {
  describe('when status is completed', () => {
    test('renders', () => {
      const todo = makeTodo({
        description: 'Read the book',
        status: TodoStatus.Completed,
      })
      render(<ShowTodo todo={todo} />)
      const descriptionElement = screen.getByText(todo.description)
      expect(descriptionElement).toBeInTheDocument()
      expect(descriptionElement).toHaveClass('status-completed')
    })
  })

  describe('when status is incomplete', () => {
    test('renders with striketrough', () => {
      const todo = makeTodo({
        description: 'Learn french',
        status: TodoStatus.Incomplete,
      })
      render(<ShowTodo todo={todo} />)
      const descriptionElement = screen.getByText(todo.description)
      expect(descriptionElement).toBeInTheDocument()
      expect(descriptionElement).toHaveClass('status-incomplete')
    })
  })
})
