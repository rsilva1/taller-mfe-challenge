import './filter.css'
import { TodoStatus } from "@enums/todo-status.enum"
import { FilterProps } from './filter.types';

export const Filter: React.FC<FilterProps> = ({ filterBy, setFilterBy }) => {
  const statuses: {name: string; status: TodoStatus | null}[] = [
    { name: 'All', status: null },
    { name: 'Completed', status: TodoStatus.Completed },
    { name: 'Active', status: TodoStatus.Incomplete },
  ]
  return (
    <div className="container">
      {statuses.map(({ name, status }) => (
        <button
          key={status}
          disabled={filterBy === status}
          onClick={() => setFilterBy(status)}
        >
          { name }
        </button>
      ))}
    </div>
  )
}
