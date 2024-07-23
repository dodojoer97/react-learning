// src/services/CategoryService.ts
import categoryRepository from "../repositories/CategoryRepository";
import { Category } from "../models/Category";

class CategoryService {
	async createCategory(category: Category): Promise<void> {
		await categoryRepository.addCategory(category);
	}

	async fetchCategoriesByUser(userId: string): Promise<Category[]> {
		return await categoryRepository.getCategoriesByUser(userId);
	}
}

export default new CategoryService();
