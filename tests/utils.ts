import { TodoStatus } from "@enums/todo-status.enum";
import { Todo } from "@interfaces/todo.interface";
import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';

// not fancy installing lodash just for a sampling function
const sample = <T>(arr: T[]): T => {
  const index = Math.floor((arr.length * Math.random()));
  return arr[index];
}

export const makeTodo = (params: Partial<Todo> = {}) => ({
  id: params.id || uuidv4(),
  status: params.status || sample([TodoStatus.Completed, TodoStatus.Incomplete]),
  description: params.description || faker.lorem.sentence(),
})
