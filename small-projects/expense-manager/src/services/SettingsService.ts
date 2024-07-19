// Interface
import { ISettingsService } from "./SettingsService.d";

// Classes
import BaseService from "./BaseService";

// Models
import Category from "@/models/Category";
import Currency from "@/models/Currency";

// Mock promises
import { promisify } from "@/utils/utils";

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
		return promisify(undefined, 1000);
	}

	public async getCategories(userId: string): Promise<Category[]> {}

	public async setCurrency(userId: string, currency: Currency): Promise<void> {}
}
