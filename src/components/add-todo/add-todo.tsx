import { useState } from "react"
import { AddTodoProps } from "./add-todo.types"

export const AddTodo: React.FC<AddTodoProps> = ({
  initialDescription = '',
  onAdd,
}) => {
  const [description, setDescription] = useState(initialDescription)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // validations here
    setDescription(value);
  }

  const handleAdd = () => {
    onAdd(description)
    setDescription('')
  }

  const disabled = description.length == 0;

  return (
    <div>
      <input
        name="description"
        placeholder="Do this"
        value={description}
        onChange={handleChange}
      />
      <button
        disabled={disabled}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  )
}
