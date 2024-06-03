import { useContext, useState } from "react"
import { AddTodoProps } from "./add-todo.types"
import { ConfigContext } from "config-context"

export const AddTodo: React.FC<AddTodoProps> = ({
  initialDescription = '',
  onAdd,
}) => {
  const [description, setDescription] = useState(initialDescription)
  // could be an error, but maxLength in input already deals with this case
  const [warning, setWarning] = useState('');
  const { maxDescriptionLength } = useContext(ConfigContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > maxDescriptionLength - 5) {
      setWarning(`Warning: max length is ${maxDescriptionLength}`)
    } else {
      setWarning('')
    }
    setDescription(value)
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
        maxLength={maxDescriptionLength}
      />
      {warning && <p>{ warning }</p>}
      <button
        disabled={disabled}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  )
}
