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
exports.TokenController = void 0;
const token_model_1 = __importDefault(require("../models/token.model"));
const uuid_1 = require("uuid");
const user_model_1 = __importDefault(require("../models/user.model"));
const mail_1 = require("./../utils/mail");
const createToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: req.body.email }).lean().exec();
        if (!user)
            return res.status(400).json({ message: "User not found" });
        const token = new token_model_1.default({
            token: (0, uuid_1.v4)(),
            user: user._id,
        });
        yield token.save();
        (0, mail_1.sendRestMail)(user.email, { token: token.token, user: user._id });
        return res.status(201).json({ message: "Token created", token });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = yield token_model_1.default.findOne({
            token: req.params.token,
            user: req.params.user,
        });
        if (!token)
            return res.status(400).json({ message: "Token not found" });
        const user = yield user_model_1.default.findById(token.user);
        if (!user)
            return res.status(400).json({ message: "User not found" });
        user.password = req.body.password;
        yield user.save();
        yield token.remove();
        return res.status(200).json({ message: "Password reset successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.TokenController = {
    createToken,
    resetPassword,
};
