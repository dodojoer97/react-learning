// Models
import { UserSettings } from "@common";

export interface ISettingsService {
	/**
	 * Gets the settings for a specific user by user ID.
	 * @param {string} userId The user ID to get settings for.
	 * @returns {Promise<UserSettings>} The user's settings
	 */
	getSettings(userId: string): Promise<UserSettings>;

	/**
	 * Gets the settings for a specific user by user ID.
	 * @param {string} userId The user ID to get settings for.
	 * @param {Partial<UserSettings>} fields the fields to update on settings
	 * @returns {Promise<UserSettings>} The user's settings
	 */
	updateSettings(
		userId: string,
		fields: Partial<Omit<UserSettings, "id" | "userId">>
	): Promise<UserSettings>;
}
