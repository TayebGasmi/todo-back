import { Router } from "express";
import { TokenController } from "../controllers/token.controller";
const router = Router();
router.post("/", TokenController.createToken);
router.patch("/:user/:token", TokenController.resetPassword);
export default router;
