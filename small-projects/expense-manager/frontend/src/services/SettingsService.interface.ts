// Models
import SelectFieldOption from "@/models/SelectFieldOption";

export interface ISettingsService {
	/**
	 * Sets the currency for a specific user.
	 *
	 * @param {string} userId - The ID of the user to set the currency for.
	 * @param {Currency} currency - The currency to set for the user.
	 * @returns {Promise<void>} - A promise that resolves when the currency has been set.
	 */
	setCurrency(userId: string, currency: SelectFieldOption): Promise<void>;
}
