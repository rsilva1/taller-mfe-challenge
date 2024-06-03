import { render, screen } from "@testing-library/react"
import { EditTodoStatus } from "./edit-todo-status"
import { makeTodo } from "@tests/utils"
import userEvent from "@testing-library/user-event"
import { TodoStatus } from "@enums/todo-status.enum"

describe.skip('EditTodoStatus', () => {
  test('calls updateStatus on checkbox toggle', async () => {
    const user = userEvent.setup()

    const incompleteTodo = makeTodo({ status: TodoStatus.Incomplete })
    const updateStatus = vi.fn()
    const { rerender } = render(<EditTodoStatus todo={incompleteTodo} updateStatus={updateStatus} />)

    const checkboxElement = screen.getByRole('checkbox')
    await user.click(checkboxElement)
    expect(updateStatus).toHaveBeenCalledOnce()
    expect(updateStatus).toHaveBeenCalledWith(incompleteTodo, TodoStatus.Completed)

    const completedTodo = makeTodo({ status: TodoStatus.Completed })
    rerender(<EditTodoStatus todo={completedTodo} updateStatus={updateStatus} />)
    await user.click(checkboxElement)
    expect(updateStatus).toHaveBeenCalledTimes(2)
    expect(updateStatus).toHaveBeenLastCalledWith(completedTodo, TodoStatus.Incomplete)
  })
})
