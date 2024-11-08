// src/routes/authRoutes.ts
import express from "express";
import settingsController from "@/controllers/SettingsController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// GET
router.get("/settings/:userId", authenticateToken, settingsController.getSettings);

// POST
router.post("/settings", authenticateToken, settingsController.createInitialSettings);

// PUT
router.put("/settings", authenticateToken, settingsController.updateSettings);

export default router;
