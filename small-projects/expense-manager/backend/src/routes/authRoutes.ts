// src/routes/authRoutes.ts
import express from "express";
import authController from "../controllers/AuthController";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

export default router;