// Interface
import { ICategoryService } from "./CategoryService.interface";

// Classes
import BaseService from "./BaseService";

// Models
import { Category } from "@common";
import SelectFieldOption from "@/models/SelectFieldOption";

// DTO
import GetCategoriesDTO from "@/DTO/response/GetCategories";

// Config
import { categoryIcons } from "@/config/categoryIcons";

/**
 *  SettingsService class for handling settings.
 *  Extends BaseService to use common service functionalities.
 */
class CategoryService extends BaseService implements ICategoryService {
	/**
	 * SettingsService constructor.
	 * Sets up the base URL for the API.
	 */
	constructor() {
		const baseUrl = "http://localhost:3000";
		super(baseUrl);
	}

	/**
	 * Gets categories for a user.
	 * @param {string} userId - The ID of the user.
	 * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
	 */
	public async getCategories(userId: string): Promise<Category[]> {
		const endpoint = `categories/${userId}`;
		const categories: GetCategoriesDTO = await this.get(endpoint, { auth: true });
		return this.buildCategories(categories);
	}

	private buildCategories(dto: GetCategoriesDTO): Category[] {
		const categories: Category[] = dto.map((category) => {
			return {
				icon: categoryIcons[category.icon as string],
				name: category.name,
				id: category.id,
				type: category.type,
			};
		});
		return categories;
	}
	/**
	 * Creates a new category for a user.
	 * @param {Category} category - The category to create.
	 * @param {string} userId - The ID of the user.
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async createCategory(category: Category, userId: string): Promise<Category[]> {
		const endpoint = `categories`;
		const categories = await this.post(endpoint, { category, userId }, { auth: true });

		return this.buildCategories(categories);
	}

	/**
	 * Edits an existing category for a user.
	 * @param {string} userId - The ID of the user.
	 * @param {string} categoryId - The categoryId to edit.
	 * @param {string} newName - The new name;
	 * @returns {Promise<void>} A promise that resolves when the operation is complete.
	 */
	public async editCategory(userId: string, categoryId: string, newName: string): Promise<void> {
		// Real endpoint
		// const endpoint = `users/${userId}/categories/${category.id}`;
		const endpoint = `categories/${userId}/${categoryId}`;
		await this.put(endpoint, { name: newName }, { auth: true });
	}
}

export default CategoryService;
