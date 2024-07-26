// src/routes/authRoutes.ts
import express from "express";
import authController from "../controllers/AuthController";

const router = express.Router();

router.post("/auth/login", authController.login);
router.post("/auth/register", authController.register);
router.post("/auth/verify", authController.verifyToken);

export default router;
