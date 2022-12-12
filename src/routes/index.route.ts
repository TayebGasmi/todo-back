import { Router } from "express";
import authRouter from "./auth.route";
import todoRouter from "./todo.route";
import tokenRouter from "./token.route";
const router = Router();
router.use("/auth", authRouter);
router.use("/todos", todoRouter);
router.use("/token", tokenRouter);
export default router;
