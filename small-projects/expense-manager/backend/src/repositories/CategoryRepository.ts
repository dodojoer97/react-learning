// src/repositories/CategoryRepository.ts
import { db } from "../config/firebaseAdmin";
import { Category } from "../models/Category";

class CategoryRepository {
	private categoriesCollection = db.collection("categories");

	async addCategory(category: Category): Promise<void> {
		const categoryDoc = this.categoriesCollection.doc(category.id);
		await categoryDoc.set(category);
	}

	async addCategories(categories: Category[]): Promise<void> {
		const batch = db.batch();
		categories.forEach((category) => {
			const categoryDoc = this.categoriesCollection.doc(category.id);
			batch.set(categoryDoc, category);
		});
		await batch.commit();
	}

	async getCategoriesByUser(userId: string): Promise<Category[]> {
		const snapshot = await this.categoriesCollection.where("userId", "==", userId).get();
		return snapshot.docs.map((doc) => doc.data() as Category);
	}
}

export default new CategoryRepository();
