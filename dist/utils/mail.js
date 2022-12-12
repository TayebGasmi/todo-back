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
exports.sendRestMail = void 0;
//send mail with nodemailer
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = __importDefault(require("./../logs/logger"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "5d711413e5defa",
        pass: "333d1c7059822e",
    },
});
const sendRestMail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transport.sendMail({
            from: "to do app",
            to: to,
            subject: "Reset Password",
            html: `<h1>Reset Password</h1>
    <p>Click the link below to reset your password</p>
    <a href="${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password/${token.user}/${token.token}">Reset Password</a>`,
        });
        logger_1.default.info(`Reset password mail sent to ${to}`);
    }
    catch (error) {
        logger_1.default.error(error.message);
    }
});
exports.sendRestMail = sendRestMail;
