import { Category } from "@common";

export interface ICategoryService {
	/**
	 * Edits an existing category for a user.
	 * @param {string} userId - The ID of the user.
	 * @param {string} categoryId - The categoryId to edit.
	 * @param {string} newName - The new name;
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	editCategory(userId: string, categoryId: string, newName: string): Promise<void>;

	/**
	 * Retrieves the categories for a specific user.
	 *
	 * @param {string} userId - The ID of the user to get the categories for.
	 * @returns {Promise<Category[]>} - A promise that resolves with the user's categories.
	 */
	getCategories(userId: string): Promise<Category[]>;
}
