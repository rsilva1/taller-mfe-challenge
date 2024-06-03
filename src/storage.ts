import { Todo } from "@interfaces/todo.interface";
import { TodosLocalStorage } from "local-storage";

export interface ITodosStorage {
  save(todo: Todo[]): Promise<void>,
  load(): Promise<Todo[]>,
}

export class TodosStorage implements ITodosStorage {
  readonly storage: ITodosStorage;

  // can pass param in constructor to implement other storage strategies
  constructor() {
    this.storage = new TodosLocalStorage();
  }

  async save(todos: Todo[]) {
    await this.storage.save(todos);
  }

  async load() {
    return await this.storage.load();
  }
}
