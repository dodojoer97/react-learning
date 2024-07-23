// src/routes/categoryRoutes.ts
import { Router } from "express";
import categoryController from "../controllers/CategoryController";

const router = Router();

router.post("/categories", categoryController.addCategory);
router.get("/categories/:userId", categoryController.getCategoriesByUser);

export default router;
