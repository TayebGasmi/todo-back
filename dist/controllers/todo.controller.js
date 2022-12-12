"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = __importDefault(require("../models/todo.model"));
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        //@ts-ignore
        const owner = req === null || req === void 0 ? void 0 : req.user;
        const todo = new todo_model_1.default({
            title,
            description,
            owner: owner.id || owner._id,
        });
        yield todo.save();
        return res.status(201).json({ message: "Todo created", todo });
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
const getTodos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const owner = req === null || req === void 0 ? void 0 : req.user;
        const id = owner.id || owner._id;
        const todos = yield todo_model_1.default.find({ owner: id });
        return res.status(200).json({ todos });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, finished } = req.body;
        const todo = yield todo_model_1.default.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        //@ts-ignore
        const owner = req === null || req === void 0 ? void 0 : req.user;
        const ownerId = owner.id || owner._id;
        //verify if the todo belongs to the user
        if (todo.owner.toString() !== ownerId.toString())
            return res.status(401).json({ message: "Unauthorized" });
        if (title)
            todo.title = title;
        if (description)
            todo.description = description;
        if (finished)
            todo.finished = finished;
        yield todo.save();
        return res.status(200).json({ message: "Todo updated", todo });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
const deleteTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield todo_model_1.default.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Todo not found" });
        //@ts-ignore
        const owner = req === null || req === void 0 ? void 0 : req.user;
        //verify if the todo belongs to the user
        const ownerId = owner.id || owner._id;
        //verify if the todo belongs to the user
        if (todo.owner.toString() !== ownerId.toString())
            return res.status(401).json({ message: "Unauthorized" });
        yield todo.remove();
        return res.status(200).json({ message: "Todo deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.default = { addTodo, getTodos, updateTodo, deleteTodo };
