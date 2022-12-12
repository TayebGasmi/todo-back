import express from "express";
import cors from "cors";
import connect from "./db/connect";
import router from "./routes/index.route";
import logger from "./logs/logger";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
cors();
app.use("/", router);
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
