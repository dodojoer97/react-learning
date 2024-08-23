// src/repositories/CategoryRepository.ts
import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { adminDb } from "../config/firebase";
import { Category } from "@common";

class CategoryRepository {
	private categoriesCollection = adminDb.collection("categories");

	// Add a category for a specific user
	async addCategoryForUser(category: Category, userId: string): Promise<void> {
		const categoryDoc = this.categoriesCollection.doc(category.name);
		const userCategory = { ...category, userId }; // Add userId to the category object
		console.log("userCategory: ", userCategory);
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

	// Get category snapshot for a specific user
	async getCategorySnapshotForUser(
		categoryId: string,
		userId: string
	): Promise<QuerySnapshot<DocumentData>> {
		const snapshot = await this.categoriesCollection
			.where("id", "==", categoryId)
			.where("userId", "==", userId)
			.get();
		return snapshot;
	}

	// Check if a category exists by name and user ID
	async categoryExistsByNameForUser(categoryName: string, userId: string): Promise<boolean> {
		const snapshot = await this.categoriesCollection
			.where("name", "==", categoryName)
			.where("userId", "==", userId)
			.get();
		return !snapshot.empty;
	}

	// Edit a category for a specific user
	async editCategoryForUser(
		snapshot: QuerySnapshot<DocumentData>, // Pass the snapshot directly
		newName: string
	): Promise<void> {
		if (!snapshot.empty) {
			// Assuming only one document is returned since id should be unique
			const docRef = snapshot.docs[0].ref;
			await docRef.update({ name: newName });
		} else {
			throw new Error(`Category does not exist for the provided user`);
		}
	}
}

export default new CategoryRepository();
