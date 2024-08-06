// src/repositories/CategoryRepository.ts
import { adminDb } from "../config/firebase";
import { Category } from "../models/Category";

class CategoryRepository {
	private categoriesCollection = adminDb.collection("categories");

	// Add a category for a specific user
	async addCategoryForUser(category: Category, userId: string): Promise<void> {
		const categoryDoc = this.categoriesCollection.doc(category.name);
		const userCategory = { ...category, userId }; // Add userId to the category object
		await categoryDoc.set(userCategory);
	}

	// Add multiple categories for a specific user
	async addCategoriesForUser(categories: Category[], userId: string): Promise<void> {
		const batch = adminDb.batch();
		categories.forEach((category) => {
			const categoryDoc = this.categoriesCollection.doc(category.name);
			const userCategory = { ...category, userId }; // Add userId to each category object
			batch.set(categoryDoc, userCategory);
		});
		await batch.commit();
	}

	// Retrieve categories by a specific user ID
	async getCategoriesByUser(userId: string): Promise<Category[]> {
		const snapshot = await this.categoriesCollection.where("userId", "==", userId).get();
		return snapshot.docs.map((doc) => doc.data() as Category);
	}

	// Check if a category exists for a specific user
	async categoryExistsForUser(categoryName: string, userId: string): Promise<boolean> {
		const snapshot = await this.categoriesCollection
			.where("name", "==", categoryName)
			.where("userId", "==", userId)
			.get();
		return !snapshot.empty;
	}

	// Edit a category for a specific user
	async editCategoryForUser(
		categoryId: string,
		userId: string,
		newData: Partial<Category>
	): Promise<void> {
		const categoryDoc = this.categoriesCollection.doc(categoryId);
		const snapshot = await categoryDoc.get();

		const data = snapshot.data();

		if (snapshot.exists && data && data.userId === userId) {
			await categoryDoc.update(newData);
		} else {
			throw new Error(`Category with ID ${categoryId} does not exist for user ${userId}`);
		}
	}
}

export default new CategoryRepository();
