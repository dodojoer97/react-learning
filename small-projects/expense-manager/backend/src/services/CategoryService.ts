// src/services/CategoryService.ts
import categoryRepository from "../repositories/CategoryRepository";
import { Category } from "../models/Category";

class CategoryService {
	async addCategory(category: Category): Promise<void> {
		await categoryRepository.addCategory(category);
	}

	async getCategoriesByUser(userId: string): Promise<Category[]> {
		return await categoryRepository.getCategoriesByUser(userId);
	}

	async addDefaultCategories(): Promise<void> {
		return await categoryRepository.addCategories([]);
	}
}

export default new CategoryService();
