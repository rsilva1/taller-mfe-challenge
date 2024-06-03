import { Todo } from "@interfaces/todo.interface";
import { ITodosStorage } from "storage";

export class TodosLocalStorage implements ITodosStorage {
  private prefix = 'todo-list-app';

  async save(todos: Todo[]) {
    localStorage.setItem(`${this.prefix}-state`, JSON.stringify(todos))
  }

  async load() {
    let items = [];
    const stored = localStorage.getItem(`${this.prefix}-state`)
    if (!stored) {
      throw new Error('Empty store')
    }
    try {
      items = JSON.parse(stored)
    } catch(err) {
      throw new Error('Failed to parse stored value')
    }
    return items
  }
}
