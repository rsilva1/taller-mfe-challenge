import { TodoStatus } from "@enums/todo-status.enum";
import { Todo } from "@interfaces/todo.interface"
import { Reducer } from "react";

export enum ActionTypes {
  Set = 'set',
  Add = 'add',
  UpdateStatus = 'update-status',
};

type TodoState = Todo[];

export type TodoActions = {
  type: ActionTypes.Set,
  payload: Todo[],
} | {
  type: ActionTypes.Add,
  payload: Todo,
} | {
  type: ActionTypes.UpdateStatus,
  payload: {
    id: string,
    status: TodoStatus,
  }
}

export const todosInitialState: TodoState = [];

export const todoReducer: Reducer<TodoState, TodoActions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.Set:
      return action.payload;
    case ActionTypes.Add:
      return [...state, action.payload];
    case ActionTypes.UpdateStatus:
      return [...state].map((todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, status: action.payload.status};
        }
        return todo;
      });
    default:
      throw new Error('Unexpected action type')
  }
}
