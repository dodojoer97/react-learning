// src/services/CategoryService.ts
import categoryRepository from "../repositories/CategoryRepository";
import { Category } from "../models/Category";

// Data
import initialCategories from "../data/initialCategories";

class CategoryService {
	// Adds a single category for a specific user
	async addCategoryForUser(category: Category, userId: string): Promise<void> {
		await categoryRepository.addCategoryForUser(category, userId);
	}

	// Retrieves categories for a specific user
	async getCategoriesByUser(userId: string): Promise<Category[]> {
		return await categoryRepository.getCategoriesByUser(userId);
	}

	// Adds default categories for a new user
	async addDefaultCategoriesForUser(userId: string): Promise<void> {
		await categoryRepository.addCategoriesForUser(initialCategories, userId);
	}
}

export default new CategoryService();
