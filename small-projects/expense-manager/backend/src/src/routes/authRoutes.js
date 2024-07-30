"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = express_1.default.Router();
router.post("/auth/login", AuthController_1.default.login);
router.post("/auth/register", AuthController_1.default.register);
router.get("/auth/verify-token", AuthController_1.default.verifyToken);
exports.default = router;
