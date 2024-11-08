import settingsRepository from "@/repositories/SettingsRepository";

import { Logger, User, UserSettings, isError } from "@common";

const logger = new Logger("SettingsService");

class SettingsService {
	/**
	 * Creates the intial settings for a user with default values
	 * @param {string} userId the user to create the settings for
	 * @returns {Promise<void>}
	 */
	async createInitialSettings(userId: string): Promise<void> {
		await settingsRepository.createInitialSettings(userId);
	}

	/**
	 * Gets the settings for a specific user by user ID.
	 * @param {string} userId The user ID to get settings for.
	 * @returns {Promise<UserSettings | null>} The user's settings, or null if none found.
	 */
	async getSettings(userId: string): Promise<UserSettings | null> {
		return await settingsRepository.getSettingsByUserId(userId);
	}

	/**
	 * Gets the settings for a specific user by user ID.
	 * @param {string} userId The user ID to get settings for.
	 * @param {Partial<UserSettings>} fields the fields to update on settings
	 * @returns {Promise<UserSettings | null>} The user's settings, or null if none found.
	 */
	async updateSettings(
		userId: string,
		fields: Partial<Omit<UserSettings, "id" | "userId">>
	): Promise<UserSettings | null> {
		return await settingsRepository.updateSettingsByUserId(userId, fields);
	}
}

export default new SettingsService();
