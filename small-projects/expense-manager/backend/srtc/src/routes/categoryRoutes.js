"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/categoryRoutes.ts
const express_1 = require("express");
const CategoryController_1 = __importDefault(require("../controllers/CategoryController"));
const router = (0, express_1.Router)();
router.post("/categories", CategoryController_1.default.addCategory);
router.get("/categories/:userId", CategoryController_1.default.getCategoriesByUser);
exports.default = router;
