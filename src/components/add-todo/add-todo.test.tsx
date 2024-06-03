import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AddTodo } from "./add-todo"
import { AddTodoProps } from "./add-todo.types"
import { ConfigContext, defaultConfig } from "config-context"

const ConfigProvider = ({ children }) => {
  return (
    <ConfigContext.Provider value={{ ...defaultConfig, maxDescriptionLength: 20 }}>
      {children}
    </ConfigContext.Provider>
  )
}
const renderAddTodo = (params?: Partial<AddTodoProps>) => {
  const onAdd = params?.onAdd || vi.fn()
  const result = render(<AddTodo {...params} onAdd={onAdd}/>, {
    wrapper: ConfigProvider
  })
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

    renderAddTodo({ initialDescription: 'Mop the floor' })

    const descriptionElement = screen.getByRole('textbox')
    await user.clear(descriptionElement)

    const submitElement = screen.getByRole('button')
    expect(submitElement).toBeDisabled();

    await user.type(descriptionElement, 'a')
    expect(submitElement).not.toBeDisabled();
  })

  test('has max input length', async () => {
    const user = userEvent.setup()

    const longString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec commodo, nisi eget gravida volutpat'
    renderAddTodo()

    const descriptionElement = screen.getByRole('textbox') as HTMLInputElement
    await user.type(descriptionElement, longString)
    expect(descriptionElement.value).toBe(longString.slice(0, 20))
  })
})
