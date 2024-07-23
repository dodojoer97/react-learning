// src/routes/userRoutes.ts
import { Router } from "express";
import userController from "../controllers/UserController";

const router = Router();

router.post("/users", userController.addUser);
router.get("/users", userController.getUsers);

export default router;
