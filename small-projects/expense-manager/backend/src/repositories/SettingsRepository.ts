import { adminDb } from "../config/firebase";
import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { Logger, User, UserSettings, isError } from "@common";

// UUID
import { v4 } from "uuid";

const logger = new Logger("SettingsRepository");

const DEFAULT_CURRENCY = "USD";
const DEFAULT_NUMBER_SEPERATOR = ".";

class SettingsRepository {
	private settingsCollection = adminDb.collection("settings");

	/**
	 * Creates the intial settings for a user with default values
	 * @param {string} userId the user to create the settings for
	 */
	async createInitialSettings(userId: string): Promise<void> {
		try {
			const settingsModel: UserSettings = {
				id: v4(),
				currency: DEFAULT_CURRENCY,
				userId,
				numberSeperator: DEFAULT_NUMBER_SEPERATOR,
			};

			const settingsDoc = this.settingsCollection.doc(settingsModel.id);
			await settingsDoc.set(settingsModel);
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in createInitialSettings");
			}
		}
	}

	/**
	 * Gets the settings for a specific user by user ID.
	 * @param {string} userId The user ID to get settings for.
	 * @returns {Promise<UserSettings | null>} The user's settings, or null if none found.
	 */
	async getSettingsByUserId(userId: string): Promise<UserSettings | null> {
		try {
			const snapshot = await this.getSettingsSnapshotByUserId(userId);

			if (!snapshot) {
				return null;
			}
			const settingsData = snapshot.docs[0].data() as UserSettings;
			return new UserSettings(settingsData);
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in getSettingsByUserId");
			}
			return null;
		}
	}

	/**
	 * Gets the settings for a specific user by user ID.
	 * @param {string} userId The user ID to get settings for.
	 * @param {Partial<UserSettings>} fields the fields to update on settings
	 * @returns {Promise<UserSettings | null>} The user's settings, or null if none found.
	 */
	async updateSettingsByUserId(
		userId: string,
		fields: Partial<UserSettings>
	): Promise<UserSettings | null> {
		try {
			// Step 1: Get the Settings snapshot
			const snapshot = await this.getSettingsSnapshotByUserId(userId);

			if (!snapshot) {
				return null;
			}

			// Step 2: get the ref
			const docRef = snapshot.docs[0].ref;

			// Step 3: update the data and return
			await docRef.update({ ...fields });

			const settingsData = snapshot.docs[0].data() as UserSettings;
			return { ...settingsData, ...fields };
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in updateSettingsByUserId");
			}
			return null;
		}
	}

	/**
	 * Retrieves the transaction snapshot for a specific userID
	 * @param {string} userId the user id to retrieve the snapshot for
	 * @returns {Promise<QuerySnapshot<DocumentData>>} The snapshot retrieved
	 */
	private async getSettingsSnapshotByUserId(
		userId: string
	): Promise<QuerySnapshot<DocumentData> | null> {
		try {
			const query = this.settingsCollection.where("userId", "==", userId);
			const snapshot = await query.get();

			if (snapshot.empty) {
				logger.info(`No settings found for userId: ${userId}`);
				return null;
			}

			return snapshot;
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in getSettingsSnapshotByUserId");
			}
			return null;
		}
	}
}

export default new SettingsRepository();
