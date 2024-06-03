import { Todo } from "@interfaces/todo.interface";
import { ITodosStorage } from "storage";

export class TodosLocalStorage implements ITodosStorage {
  private prefix = 'todo-list-app';

  async save(todos: Todo[]) {
    localStorage.setItem(`${this.prefix}-state`, JSON.stringify(todos))
  }

  async load() {
    const items = localStorage.getItem(`${this.prefix}-state`)
    if (items) {
      return JSON.parse(items)
    }
    return [];
  }
}
