import { makeTodo } from "@tests/utils"
import { TodosLocalStorage } from "local-storage"

describe('TodosLocalStorage', () => {
  let originalLocalStorage: Storage

  beforeAll(() => {
    originalLocalStorage = window.localStorage
    window.localStorage = {
      setItem: vi.fn(),
      getItem: vi.fn(),
      clear: vi.fn(),
      removeItem: vi.fn(),
      key: vi.fn(),
      length: 0,
    }
  })

  afterAll(() => {
    window.localStorage = originalLocalStorage
  })

  test('save', async () => {
    const storage = new TodosLocalStorage()
    const todos = [makeTodo()]
    const setItemSpy = vi.spyOn(window.localStorage, 'setItem')
    await storage.save(todos)
    expect(setItemSpy).toHaveBeenCalledWith('todo-list-app-state', JSON.stringify(todos))
  })

  describe('load', async () => {
    test('loads items', async () => {
      const storage = new TodosLocalStorage()
      const todos = [makeTodo()]
      const stringifiedTodos = JSON.stringify(todos)
      const getItemSpy = vi.spyOn(window.localStorage, 'getItem')
        .mockReturnValueOnce(stringifiedTodos);
      const items = await storage.load()
      expect(getItemSpy).toHaveBeenCalled()
      expect(items).toEqual(todos)
    })

    test('throws if nothing is stored', async () => {
      const storage = new TodosLocalStorage()
      const getItemSpy = vi.spyOn(window.localStorage, 'getItem')
        .mockReturnValueOnce(null);
      expect(async () => {
        await storage.load()
      }).rejects.toThrowError(/empty store/i)
      expect(getItemSpy).toHaveBeenCalled()
    })

    test('throws if fails to parse stored string', async () => {
      const storage = new TodosLocalStorage()
      const getItemSpy = vi.spyOn(window.localStorage, 'getItem')
        .mockReturnValueOnce('{');
      expect(async () => {
        await storage.load()
      }).rejects.toThrowError(/failed to parse/i)
      expect(getItemSpy).toHaveBeenCalled()
    })
  })
})
