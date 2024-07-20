// Interface
import { ISettingsService } from "./SettingsService.d";

// Classes
import BaseService from "./BaseService";

// Models
import Category from "@/models/Category";
import Currency from "@/models/Currency";

/**
 *  SettingsService class for handling settings
 * Extends BaseService to use common service functionalities.
 */

class SettingsService extends BaseService implements ISettingsService {
	constructor() {
		const baseUrl = "http://localhost:8000/someurl";
		super(baseUrl);
	}

	public async setCategories(categories: Category[], userId: string): Promise<void> {
		const endpoint = `users/${userId}/categories`;
		await this.put<Category[]>(endpoint, categories);
	}

	public async getCategories(userId: string): Promise<Category[]> {
		const endpoint = `users/${userId}/categories`;
		return this.get<Category[]>(endpoint);
	}

	public async setCurrency(userId: string, currency: Currency): Promise<void> {
		const endpoint = `users/${userId}/currency`;
		await this.put<Currency>(endpoint, currency);
	}
}

export default SettingsService;
