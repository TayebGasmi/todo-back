import { Router } from "express";
import todoController from "../controllers/todo.controller";
import authorize from "../middlewares/authorize";
import validateRequest from "./../middlewares/validateRequest";
import todoSchema from "./../schemas/todo.schema";
const { addTodo, getTodos, updateTodo, deleteTodo } = todoController;
const router = Router();
router.post("/", validateRequest(todoSchema), authorize, addTodo);
router.get("/", getTodos);
router.put("/:id", authorize, updateTodo);
router.delete("/:id", authorize, deleteTodo);

export default router;
