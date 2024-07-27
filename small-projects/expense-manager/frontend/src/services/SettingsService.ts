// Interface
import { ISettingsService } from "./SettingsService.d";

// Classes
import BaseService from "./BaseService";

// Models
import Category from "@/models/Category";
import Currency from "@/models/Currency";

// DTO
import GetCategoriesDTO from "@/DTO/response/GetCategories";

// Config
import categoryImages from "@/config/categoryImages";

/**
 *  SettingsService class for handling settings.
 *  Extends BaseService to use common service functionalities.
 */
class SettingsService extends BaseService implements ISettingsService {
	/**
	 * SettingsService constructor.
	 * Sets up the base URL for the API.
	 */
	constructor() {
		const baseUrl = "http://localhost:3000";
		super(baseUrl);
	}

	/**
	 * Sets categories for a user.
	 * @param {Category[]} categories - The categories to set.
	 * @param {string} userId - The ID of the user.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async setCategories(categories: Category[], userId: string): Promise<void> {
		const endpoint = `users/${userId}/categories`;
		await this.put<Category[]>(endpoint, categories);
	}

	/**
	 * Gets categories for a user.
	 * @param {string} userId - The ID of the user.
	 * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
	 */
	public async getCategories(userId: string): Promise<Category[]> {
		const endpoint = `categories/${userId}`;
		const categories: GetCategoriesDTO = await this.get(endpoint);
		return this.buildCategories(categories);
	}

	private buildCategories(dto: GetCategoriesDTO): Category[] {
		const categories: Category[] = dto.map(
			(category) => new Category(categoryImages[category.icon], category.name, category.id)
		);
		return categories;
	}
	/**
	 * Sets currency for a user.
	 * @param {Currency} currency - The currency to set.
	 * @param {string} userId - The ID of the user.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async setCurrency(userId: string, currency: Currency): Promise<void> {
		const endpoint = `users/${userId}/currency`;
		await this.put<Currency>(endpoint, currency);
	}

	/**
	 * Creates a new category for a user.
	 * @param {Category} category - The category to create.
	 * @param {string} userId - The ID of the user.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async createCategory(category: Category, userId: string): Promise<void> {
		const endpoint = `users/${userId}/categories`;
		const categories = await this.get(endpoint);
		categories.push(category);
		await this.put(endpoint, categories);
	}

	/**
	 * Edits an existing category for a user.
	 * @param {Category} category - The category to edit.
	 * @param {string} userId - The ID of the user.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async editCategory(category: Category, userId: string): Promise<void> {
		// Real endpoint
		// const endpoint = `users/${userId}/categories/${category.id}`;
		const localEndpoint = `users/${userId}/categories`;
		await this.put(localEndpoint, category);
	}
}

export default SettingsService;
