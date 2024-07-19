// Models
import Category from "@/models/Category";
import Currency from "@/models/Currency";

export interface ISettingsService {
	/**
	 * Sets the categories for a specific user.
	 *
	 * @param {Category[]} categories - The categories to add.
	 * @param {string} userId - The ID of the user to add the categories to.
	 * @returns {Promise<void>} - A promise that resolves when the categories have been set.
	 */
	setCategories(categories: Category[], userId: string): Promise<void>;

	/**
	 * Retrieves the categories for a specific user.
	 *
	 * @param {string} userId - The ID of the user to get the categories for.
	 * @returns {Promise<Category[]>} - A promise that resolves with the user's categories.
	 */
	getCategories(userId: string): Promise<Category[]>;

	/**
	 * Sets the currency for a specific user.
	 *
	 * @param {string} userId - The ID of the user to set the currency for.
	 * @param {Currency} currency - The currency to set for the user.
	 * @returns {Promise<void>} - A promise that resolves when the currency has been set.
	 */
	setCurrency(userId: string, currency: Currency): Promise<void>;
}
