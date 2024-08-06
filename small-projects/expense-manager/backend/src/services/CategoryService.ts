// src/services/CategoryService.ts
import categoryRepository from "../repositories/CategoryRepository";
import { Category } from "../models/Category";

import initialCategories from "../data/initialCategories";

class CategoryService {
	// Adds a single category for a specific user
	async addCategoryForUser(category: Category, userId: string): Promise<Category[]> {
		// Check if the category already exists for the user
		const exists = await categoryRepository.categoryExistsForUser(category.name, userId);
		if (exists) {
			throw new Error(
				`Category with name ${category.name} already exists for user ${userId}`
			);
		}

		// Add the category for the user
		await categoryRepository.addCategoryForUser(category, userId);

		// Retrieve and return the updated list of categories for the user
		return await this.getCategoriesByUser(userId);
	}

	// Retrieves categories for a specific user
	async getCategoriesByUser(userId: string): Promise<Category[]> {
		return await categoryRepository.getCategoriesByUser(userId);
	}

	// Adds default categories for a new user
	async addDefaultCategoriesForUser(userId: string): Promise<void> {
		await categoryRepository.addCategoriesForUser(initialCategories, userId);
	}

	async editCategoryForUser(
		userId: string,
		categoryId: string,
		newData: Partial<Category>
	): Promise<void> {
		// Check if the category exists for the user
		const exists = await categoryRepository.categoryExistsForUser(categoryId, userId);
		if (!exists) {
			throw new Error(`Category with ID ${categoryId} does not exist for user ${userId}`);
		}

		// Edit the category
		await categoryRepository.editCategoryForUser(categoryId, userId, newData);
	}
}

export default new CategoryService();
