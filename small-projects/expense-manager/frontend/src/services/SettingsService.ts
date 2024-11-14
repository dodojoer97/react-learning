// Interface
import { ISettingsService } from "./SettingsService.interface";

// Classes
import BaseService from "./BaseService";

// Models
import { UserSettings, isError } from "@common";

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

	async getSettings(userId: string): Promise<UserSettings> {
		try {
			const userSettings: UserSettings = await this.get(`settings/${userId}`, { auth: true });

			return userSettings;
		} catch (error) {
			if (isError(error)) {
				throw error;
			}
			throw error;
		}
	}

	async updateSettings(
		userId: string,
		fields: Partial<Omit<UserSettings, "id" | "userId">>
	): Promise<UserSettings> {
		try {
			console.log("fields: ", fields);
			const userSettings: UserSettings = await this.put(
				`settings`,
				{ userId, fields },
				{ auth: true }
			);

			return userSettings;
		} catch (error) {
			if (isError(error)) {
				throw error;
			}
			throw error;
		}
	}
}

export default SettingsService;
