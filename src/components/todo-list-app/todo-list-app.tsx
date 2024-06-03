import { AddTodo } from "@components/add-todo/add-todo"
import { ListTodo } from "@components/list-todo/list-todo"
import { TodoListAppProps } from "./todo-list-app.types"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { ActionTypes, todoReducer, todosInitialState } from "reducers/todo.reducer"
import { v4 as uuidv4 } from 'uuid';
import { TodoStatus } from "@enums/todo-status.enum"
import { TodosDispatcherContext } from "todos-dispatcher-context"
import { TodosStorage } from "storage"

export const TodoListApp: React.FC<TodoListAppProps> = ({ config }) => {
  const [todos, dispatch] = useReducer(todoReducer, todosInitialState);
  const storageRef = useRef(new TodosStorage());

  const storage = storageRef.current;

  useEffect(() => {
    let mounted = true
    const loadFromStorage = async () => {
      const todos = await storage.load();
      if (mounted) {
        dispatch({ type: ActionTypes.Set, payload: todos })
      }
    }
    loadFromStorage()
    return () => {
      mounted = false;
    }
  }, []);

  useEffect(() => {
    storage.save(todos);
  }, [todos]);

  const onAdd = useCallback((description: string) => {
    dispatch({
      type: ActionTypes.Add,
      payload: {
        id: uuidv4(),
        description,
        status: TodoStatus.Incomplete,
      }
    })
  }, [dispatch]);


  return (
    <TodosDispatcherContext.Provider value={dispatch}>
      <div>
        <AddTodo onAdd={onAdd} />
        <ListTodo todos={todos} />
      </div>
    </TodosDispatcherContext.Provider>
  )
}
