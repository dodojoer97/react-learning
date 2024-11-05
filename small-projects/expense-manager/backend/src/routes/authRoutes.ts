// src/routes/authRoutes.ts
import express from "express";
import authController from "../controllers/AuthController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/request-password-reset", authController.requestPasswordReset);
router.put("/auth/reset-password", authenticateToken, authController.resetPassword);
router.put("/auth/update-info", authenticateToken, authController.updateUserInfo);

export default router;
