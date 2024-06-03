import { Todo } from "@interfaces/todo.interface";
import { ITodosStorage } from "storage";

export class TodosLocalStorage implements ITodosStorage {
  private prefix = 'todo-list-app';

  async save(todos: Todo[]) {
    localStorage.setItem(`${this.prefix}-state`, JSON.stringify(todos))
  }

  async load() {
    let items = [];
    try {
      const stored = localStorage.getItem(`${this.prefix}-state`)
      if (!stored) {
        throw new Error('Nothing in store');
      }
      items = JSON.parse(stored)
      return items
    } catch(err) {

    } finally {
      return items
    }
  }
}
