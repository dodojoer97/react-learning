// src/controllers/CategoryController.ts
import { Request, Response } from "express";
import categoryService from "../services/CategoryService";
import { Category } from "../models/Category";

class CategoryController {
	async addCategory(req: Request, res: Response): Promise<void> {
		try {
			const category: Category = req.body;
			await categoryService.createCategory(category);
			res.status(201).send(category);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async getCategoriesByUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const categories = await categoryService.fetchCategoriesByUser(userId);
			res.status(200).send(categories);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export default new CategoryController();
