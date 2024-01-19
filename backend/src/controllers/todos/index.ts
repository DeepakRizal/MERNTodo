import { ITodo } from "../../types/todo";
import { Request, Response } from "express";
import Todo from "../../models/todo";
import asyncHandler from "../../utils/asyncHandler";
import { NextFunction } from "express";

const getTodos = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const todos: ITodo[] = await Todo.find();
    res.status(200).json({
      status: "success",
      todos: todos,
    });
  }
);

const addTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body = req.body as Pick<ITodo, "name" | "description" | "status">;

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
    });

    const newTodo: ITodo = await todo.save();
    const allTodos: ITodo[] = await Todo.find();

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos });
  }
);

const updateTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {
      params: { id },
      body,
    } = req;
    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    });
  }
);

const deleteTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    );
    const allTodos: ITodo[] = await Todo.find();
    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    });
  }
);

export { getTodos, addTodo, updateTodo, deleteTodo };
