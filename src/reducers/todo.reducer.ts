import { TodoStatus } from "@enums/todo-status.enum";
import { Todo } from "@interfaces/todo.interface"
import { Reducer } from "react";

export enum ActionTypes {
  Set = 'set',
  Add = 'add',
  UpdateStatus = 'update-status',
};

export type TodoState = Todo[];

type ActionSet = {
  type: ActionTypes.Set;
  payload: Todo[];
}

type ActionAdd = {
  type: ActionTypes.Add,
  payload: Todo,
}

type ActionUpdateStatus = {
  type: ActionTypes.UpdateStatus;
  payload: {
    id: string;
    status: TodoStatus;
  };
}

export type TodoActions =
  | ActionSet
  | ActionAdd
  | ActionUpdateStatus

export const todosInitialState: TodoState = [];

export const todoReducer: Reducer<TodoState, TodoActions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.Set:
      return actionSet(state, action);
    case ActionTypes.Add:
      return actionAdd(state, action);
    case ActionTypes.UpdateStatus:
      return actionUpdateStatus(state, action);
    default:
      throw new Error('Unexpected action type')
  }
}

export const actionSet = (state: TodoState, action: ActionSet): TodoState => {
  return action.payload;
}

export const actionAdd = (state: TodoState, action: ActionAdd): TodoState => {
  return [...state, action.payload];
}

export const actionUpdateStatus = (state: TodoState, action: ActionUpdateStatus): TodoState => {
  return [...state].map((todo) => {
    if (todo.id === action.payload.id) {
      return {...todo, status: action.payload.status};
    }
    return todo;
  });
}
