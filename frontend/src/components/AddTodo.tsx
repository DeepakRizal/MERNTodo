import React, { useState, FormEvent } from "react";
import { ITodo } from "../type";

interface AddTodoProps {
  saveTodo: (
    e: FormEvent,
    newTodo: Omit<ITodo, "_id" | "createdAt" | "updatedAt">
  ) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ saveTodo }) => {
  const [newTodo, setNewTodo] = useState<
    Omit<ITodo, "_id" | "createdAt" | "updatedAt">
  >({
    name: "",
    description: "",
    status: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    saveTodo(e, newTodo);
    setNewTodo({
      name: "",
      description: "",
      status: false,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex items-center justify-center "
    >
      <input
        type="text"
        placeholder="Todo Name"
        name="name"
        value={newTodo.name}
        onChange={handleInputChange}
        className="border p-2 mr-2 rounded-md"
      />
      <input
        type="text"
        placeholder="Todo Description"
        name="description"
        value={newTodo.description}
        onChange={handleInputChange}
        className="border p-2 mr-2 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodo;
