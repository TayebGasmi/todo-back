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
exports.register = exports.login = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_model_1 = __importDefault(require("../models/user.model"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ message: "Invalid email or password" });
        if (!user.comparePassword(password))
            return res.status(401).json({ message: "Invalid email or password" });
        const token = (0, jsonwebtoken_1.sign)({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "15d" });
        return res.status(200).json({ message: "Login successful", token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.login = login;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email }).lean().exec();
        if (user)
            return res.status(400).json({ message: "User already registered" });
        const newUser = new user_model_1.default(req.body);
        yield newUser.save();
        return res.status(201).json({ message: "User created", user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.register = register;
