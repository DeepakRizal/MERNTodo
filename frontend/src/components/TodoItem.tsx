import React from "react";
import { TodoProps, ITodo } from "../type";

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
};

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? "line-through" : "";

  return (
    <div className="bg-gray-200 p-4 rounded-md shadow-md mb-4 ">
      <div className="text-lg mb-2">
        <h1 className={`font-bold ${checkTodo}`}>{todo.name}</h1>
        <p className={`text-gray-600 ${checkTodo}`}>{todo.description}</p>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => updateTodo(todo)}
          className={`bg-green-500 text-white px-4 py-2 rounded ${
            todo.status ? "hidden" : ""
          }`}
        >
          Mark as complete
        </button>
        <button
          onClick={() => deleteTodo(todo._id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
