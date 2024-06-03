import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddTodo } from "./add-todo"

describe('AddTodo', () => {
  test('renders', () => {
    render(<AddTodo onAdd={vi.fn()}/>)
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    const submitElement = screen.getByRole('button');
    expect(submitElement).toBeInTheDocument();
  })

  test('invokes onAdd', async () => {
    const user = userEvent.setup()

    const onAdd = vi.fn()
    render(<AddTodo onAdd={onAdd}/>)

    const descriptionElement = screen.getByRole('textbox')
    await user.type(descriptionElement, 'Feed the cat')

    const submitElement = screen.getByRole('button')
    await user.click(submitElement);

    expect(onAdd).toHaveBeenCalledWith('Feed the cat')
  })
})
