import { createContext } from "react";
import { TodoActions } from "reducers/todo.reducer";

export const TodosDispatcherContext = createContext<React.Dispatch<TodoActions>>(() => []);
