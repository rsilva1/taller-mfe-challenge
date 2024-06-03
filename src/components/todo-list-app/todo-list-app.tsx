import { AddTodo } from "@components/add-todo/add-todo"
import { ListTodo } from "@components/list-todo/list-todo"
import { TodoListAppProps } from "./todo-list-app.types"
import { useCallback, useEffect, useReducer, useRef } from "react"
import { ActionTypes, todoReducer, todosInitialState } from "reducers/todo.reducer"
import { v4 as uuidv4 } from 'uuid';
import { TodoStatus } from "@enums/todo-status.enum"
import { TodosDispatcherContext } from "todos-dispatcher-context"
import { TodosStorage } from "storage"
import { ConfigContext, defaultConfig } from "config-context"
import { AppConfig } from "@interfaces/app-config.interface"
import { Todo } from "@interfaces/todo.interface"

const validateConfig = (config: AppConfig) => {
  let errors = [];
  if (config.maxDescriptionLength < 10) {
    errors.push('Max Description is too short');
  }
  return { errors };
}

export const TodoListApp: React.FC<TodoListAppProps> = ({ config }) => {
  const storageRef = useRef(new TodosStorage());
  const [todos, dispatch] = useReducer(todoReducer, todosInitialState);
  const appConfig = {...defaultConfig, ...config};

  const storage = storageRef.current;

  // validate config
  const { errors } = validateConfig(appConfig);

  useEffect(() => {
    let mounted = true
    const loadFromStorage = async () => {
      const todos = await storage.load();
      if (mounted) {
        dispatch({ type: ActionTypes.Set, payload: todos })
      }
    }
    loadFromStorage().catch(err => appConfig.onError(err, 'failed to load'))
    return () => {
      mounted = false;
    }
  }, []);

  useEffect(() => {
    storage.save(todos).catch(err => appConfig.onError(err, 'failed to save'));
  }, [todos]);

  const onAdd = useCallback((description: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      description,
      status: TodoStatus.Incomplete,
    }
    dispatch({
      type: ActionTypes.Add,
      payload: newTodo,
    })
    appConfig.onAdded(newTodo);
  }, [dispatch]);

  if (errors.length) {
    return (
      <>
      <p>Wrong settings</p>
      <ul>
        {errors.map(error => (
          <li key={error}>{ error }</li>
        ))}
      </ul>
      </>
    );
  }
  return (
    <ConfigContext.Provider value={{...defaultConfig, ...config}}>
      <TodosDispatcherContext.Provider value={dispatch}>
        <div>
          <AddTodo onAdd={onAdd} />
          <ListTodo todos={todos} />
        </div>
      </TodosDispatcherContext.Provider>
    </ConfigContext.Provider>
  )
}
