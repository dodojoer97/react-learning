// src/routes/authRoutes.ts
import express from "express";
import authController from "../controllers/AuthController";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/verify", authController.verifyToken);

export default router;
