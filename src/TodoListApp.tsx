import * as React from 'react'
import * as Client from 'react-dom/client'

const root = Client.createRoot(document.getElementById('todo-list-root') as HTMLElement)
root.render(<p>Hello World</p>)
