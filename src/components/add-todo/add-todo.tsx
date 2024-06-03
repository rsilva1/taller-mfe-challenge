import { useState } from "react"
import { AddTodoProps } from "./add-todo.types"

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // validations here
    setDescription(value);
  }

  return (
    <div>
      <input
        name="description"
        placeholder="Do this"
        value={description}
        onChange={handleChange}
      />
      <button onClick={() => onAdd(description)}>Add</button>
    </div>
  )
}
