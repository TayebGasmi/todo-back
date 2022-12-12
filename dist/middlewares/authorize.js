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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const authorize = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }
        if (!token.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Invalid token" });
        }
        const tokenValue = token.split(" ")[1];
        const user = (0, jsonwebtoken_1.verify)(tokenValue, process.env.JWT_SECRET);
        // @ts-ignore
        req.user = user;
        next();
    }
    catch (error) {
        return next(error);
    }
});
exports.default = authorize;
