// src/controllers/CategoryController.ts
import { Request, Response } from "express";
import categoryService from "../services/CategoryService";
import { Category } from "../models/Category";

// DTO
import CreateCategoryDTO from "../DTO/request/CreateCategory";

// UUID
import { v4 } from "uuid";

class CategoryController {
	async addCategory(req: Request, res: Response): Promise<void> {
		try {
			const dto: CreateCategoryDTO = req.body;
			const { category, userId } = dto;

			// TODO move the creation Id to service or repo
			const categoryModel = new Category(category.icon, category.name, v4());

			const categories: Category[] = await categoryService.addCategoryForUser(
				categoryModel,
				userId
			);
			res.status(201).send(categories);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async getCategoriesByUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const categories = await categoryService.getCategoriesByUser(userId);
			res.status(200).send(categories);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async editCategory(req: Request, res: Response): Promise<void> {
		try {
			const { userId, categoryId } = req.params;
			const { name } = req.body;
			await categoryService.editCategoryForUser(userId, categoryId, name);
			res.status(200).send({ message: "updated" });
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export default new CategoryController();
