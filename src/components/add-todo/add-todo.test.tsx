import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddTodo } from "./add-todo"
import { AddTodoProps } from "./add-todo.types"

const renderAddTodo = (params?: Partial<AddTodoProps>) => {
  const onAdd = params?.onAdd || vi.fn()
  const result = render(<AddTodo {...params} onAdd={onAdd}/>)
  return  {
    ...result,
    onAdd,
  }
}

describe('AddTodo', () => {
  test('renders', () => {
    renderAddTodo()
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    const submitElement = screen.getByRole('button');
    expect(submitElement).toBeInTheDocument();
  })

  test('invokes onAdd', async () => {
    const user = userEvent.setup()

    const { onAdd } = renderAddTodo()

    const descriptionElement = screen.getByRole('textbox')
    await user.type(descriptionElement, 'Feed the cat')

    const submitElement = screen.getByRole('button')
    await user.click(submitElement);

    expect(onAdd).toHaveBeenCalledWith('Feed the cat')
  })

  test('renders with initialDescription', async () => {
    renderAddTodo({ initialDescription: 'Fix the car' })
    const descriptionElement = screen.getByRole('textbox') as HTMLInputElement
    expect(descriptionElement.value).toBe('Fix the car')
  })

  test("can't add empty description", async () => {
    const user = userEvent.setup()

    const onAdd = vi.fn()
    render(<AddTodo initialDescription="Mop the floor" onAdd={onAdd}/>)

    const descriptionElement = screen.getByRole('textbox')
    await user.clear(descriptionElement)

    const submitElement = screen.getByRole('button')
    expect(submitElement).toBeDisabled();

    await user.type(descriptionElement, 'a')
    expect(submitElement).not.toBeDisabled();
  })

  // TODO: implement this later
  test.skip('has max input length', () => {
  })
})
