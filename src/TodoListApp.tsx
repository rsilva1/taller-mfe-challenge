import { AddTodo } from '@components/add-todo/add-todo'
import { ShowTodo } from '@components/show-todo/show-todo'
import { TodoStatus } from '@enums/todo-status.enum'
import * as Client from 'react-dom/client'

const root = Client.createRoot(document.getElementById('todo-list-root') as HTMLElement)
root.render(
  <div>
    <AddTodo onAdd={() => {}}/>
    <ShowTodo todo={{ status: TodoStatus.Incomplete, description: 'Make popcorn' }} />
    <ShowTodo todo={{ status: TodoStatus.Completed, description: 'Call friends to watch movie' }} />
  </div>
)
