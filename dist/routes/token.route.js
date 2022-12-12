"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const token_controller_1 = require("../controllers/token.controller");
const router = (0, express_1.Router)();
router.post("/", token_controller_1.TokenController.createToken);
router.patch("/:user/:token", token_controller_1.TokenController.resetPassword);
exports.default = router;
