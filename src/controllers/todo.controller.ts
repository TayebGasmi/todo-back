import Todo from "../models/todo.model";
import { Request, Response, NextFunction } from "express";
const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    //@ts-ignore
    const owner = req?.user;
    const todo = new Todo({
      title,
      description,
      owner: owner.id,
    });
    await todo.save();
    return res.status(201).json({ message: "Todo created", todo });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const owner = req?.user;
    const todos = await Todo.find({ owner: owner.id });
    return res.status(200).json({ todos });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, description, finished } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    //@ts-ignore
    const owner = req?.user;
    //verify if the todo belongs to the user
    if (todo.owner.toString() !== owner.id.toString())
      return res.status(401).json({ message: "Unauthorized" });
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (finished) todo.finished = finished;
    await todo.save();
    return res.status(200).json({ message: "Todo updated", todo });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    //@ts-ignore
    const owner = req?.user;
    //verify if the todo belongs to the user
    if (todo.owner.toString() !== owner.id.toString())
      return res.status(401).json({ message: "Unauthorized" });
    await todo.remove();
    return res.status(200).json({ message: "Todo deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export default { addTodo, getTodos, updateTodo, deleteTodo };
