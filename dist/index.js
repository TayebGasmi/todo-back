"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_1 = __importDefault(require("./db/connect"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const logger_1 = __importDefault(require("./logs/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
(0, connect_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, cors_1.default)();
app.use("/", index_route_1.default);
app.listen(port, () => {
    logger_1.default.info(`Server running on port ${port}`);
});
