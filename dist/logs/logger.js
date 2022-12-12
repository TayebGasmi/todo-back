"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_2 = require("winston");
const { timestamp, colorize, printf, combine } = winston_2.format;
const logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || "info",
    format: combine(colorize(), timestamp({ format: "YYYY-MM-DD hh:mm:ss" }), printf(({ level, message, timestamp }) => {
        return `[ ${timestamp} ] ${level}: ${message}`;
    })),
    transports: [new winston_2.transports.Console()],
});
exports.default = logger;
