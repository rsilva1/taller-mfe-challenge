import { makeTodo } from "@tests/utils"
import { ActionTypes, TodoState, actionAdd, actionSet, actionUpdateStatus } from "./todo.reducer"
import { TodoStatus } from "@enums/todo-status.enum"

describe('todoReducer', () => {
  describe('set', () => {
    test('sets state', () => {
      const state: TodoState = [];
      const newState: TodoState = [makeTodo(), makeTodo()];
      const action = {
        type: ActionTypes.Set,
        payload: newState,
      } as const
      expect(actionSet(state, action)).toBe(newState);
    })
  })

  describe('add', () => {
    test('appends todo to empty list', () => {
      const todo = makeTodo();
      const state: TodoState = [];
      const newState = [todo];
      const action = {
        type: ActionTypes.Add,
        payload: todo,
      } as const
      expect(actionAdd(state, action)).toStrictEqual(newState);
    })

    test('appends todo to existing list', () => {
      const todo = makeTodo();
      const state: TodoState = [makeTodo(), makeTodo()];
      const newState = [...state, todo];
      const action = {
        type: ActionTypes.Add,
        payload: todo,
      } as const
      expect(actionAdd(state, action)).toStrictEqual(newState);
    })
  })
  
  describe('updateStatus', () => {
    test('update status of given todo id', () => {
      const state = [
        makeTodo({ id: 'a', status: TodoStatus.Completed }),
        makeTodo({ id: 'b', status: TodoStatus.Incomplete }),
        makeTodo({ id: 'c', status: TodoStatus.Incomplete }),
        makeTodo({ id: 'd', status: TodoStatus.Incomplete }),
      ]
      const actions = [{
        type: ActionTypes.UpdateStatus,
        payload: {
          id: 'c',
          status: TodoStatus.Completed,
        }
      },
      {
        type: ActionTypes.UpdateStatus,
        payload: {
          id: 'c',
          status: TodoStatus.Completed,
        }
      }] as const

      const newState = state.slice()
      newState[2].status = TodoStatus.Completed;
      expect(actionUpdateStatus(state, actions[0])).toStrictEqual(newState);

      newState[0].status = TodoStatus.Incomplete;
      expect(actionUpdateStatus(state, actions[1])).toStrictEqual(newState);
    })
  })
})
