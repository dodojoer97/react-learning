// src/routes/categoryRoutes.ts
import { Router } from "express";
import categoryController from "../controllers/CategoryController";

// Middelware
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.use(authenticateToken);

router.post("/categories", categoryController.addCategory);
router.get("/categories/:userId", categoryController.getCategoriesByUser);
router.put("/categories/:userId/:categoryId", categoryController.editCategory);

export default router;
