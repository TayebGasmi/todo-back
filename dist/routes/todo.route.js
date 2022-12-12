"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const validateRequest_1 = __importDefault(require("./../middlewares/validateRequest"));
const todo_schema_1 = __importDefault(require("./../schemas/todo.schema"));
const { addTodo, getTodos, updateTodo, deleteTodo } = todo_controller_1.default;
const router = (0, express_1.Router)();
router.post("/", (0, validateRequest_1.default)(todo_schema_1.default), authorize_1.default, addTodo);
router.get("/", getTodos);
router.put("/:id", authorize_1.default, updateTodo);
router.delete("/:id", authorize_1.default, deleteTodo);
exports.default = router;
