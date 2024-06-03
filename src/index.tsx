import { TodoListApp } from '@components/todo-list-app/todo-list-app'
import * as Client from 'react-dom/client'

const root = Client.createRoot(document.getElementById('todo-list-root') as HTMLElement)
root.render(
  <TodoListApp
    config={{
      showAddTodo: true,
    }}
  />
)
