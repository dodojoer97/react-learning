// src/routes/expenseRoutes.ts
import { Router } from "express";
import recordController from "../controllers/RecordController";

const router = Router();

router.post("/records", recordController.addRecord);
router.get("/records/:userId", recordController.getRecordsByUser);

export default router;
