import { TodoListApp } from '@components/todo-list-app/todo-list-app'
import * as Client from 'react-dom/client'

const root = Client.createRoot(document.getElementById('todo-list-root') as HTMLElement)
root.render(
  <TodoListApp
    config={{
      showAddTodo: true,
      maxDescriptionLength: 20,
      onAdded: (todo: any) => console.log(`Added: ${JSON.stringify(todo)}`),
      onStatusUpdated: (todo: any, oldStatus: string, newStatus: string) => {
        console.log(`Updated status from ${oldStatus} to ${newStatus} of ${todo?.id} ${todo?.description}`)
      },
    }}
  />
)
