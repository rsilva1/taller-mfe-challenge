import { TodoStatus } from "@enums/todo-status.enum"
import { render, screen } from "@testing-library/react"
import { Filter } from "./filter"
import userEvent from "@testing-library/user-event"

const renderFilter = (filterBy: TodoStatus | null = null) => {
  const setFilterBy = vi.fn()
  const result = render(<Filter filterBy={filterBy} setFilterBy={setFilterBy} />)
  return {
    ...result,
    setFilterBy,
  }
}

describe('Filter', () => {
  test('renders', () => {
    renderFilter()
    const allButton = screen.getByRole('button', { name: 'All' })
    expect(allButton).toBeInTheDocument()
    expect(allButton).toBeDisabled()

    const completedButton = screen.getByRole('button', { name: 'Completed' })
    expect(completedButton).toBeInTheDocument()
    expect(completedButton).not.toBeDisabled()

    const pendingButton = screen.getByRole('button', { name: 'Pending' })
    expect(pendingButton).toBeInTheDocument()
    expect(pendingButton).not.toBeDisabled()
  })

  test('resets filter when user clicks All button', async () => {
    const user = userEvent.setup()

    const { setFilterBy } = renderFilter(TodoStatus.Completed)
    const allButton = screen.getByRole('button', { name: 'All' })
    expect(allButton).toBeInTheDocument()
    expect(allButton).not.toBeDisabled()
    
    await user.click(allButton)

    expect(setFilterBy).toHaveBeenCalledWith(null)
  })

  test('sets filter to completed when user clicks Completed button', async () => {
    const user = userEvent.setup()

    const { setFilterBy } = renderFilter()
    const completedButton = screen.getByRole('button', { name: 'Completed' })
    expect(completedButton).toBeInTheDocument()
    expect(completedButton).not.toBeDisabled()
    
    await user.click(completedButton)

    expect(setFilterBy).toHaveBeenCalledWith(TodoStatus.Completed)
  })

  test('sets filter to completed when user clicks Pending button', async () => {
    const user = userEvent.setup()

    const { setFilterBy } = renderFilter()
    const pendingButton = screen.getByRole('button', { name: 'Pending' })
    expect(pendingButton).toBeInTheDocument()
    expect(pendingButton).not.toBeDisabled()
    
    await user.click(pendingButton)

    expect(setFilterBy).toHaveBeenCalledWith(TodoStatus.Incomplete)
  })
})
