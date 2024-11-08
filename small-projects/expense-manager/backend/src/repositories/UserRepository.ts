import { admin, adminDb } from "../config/firebase";
import { Logger, User, isError } from "@common";

const logger = new Logger("AuthController");

class UserRepository {
	async getUserByEmail(email: string): Promise<User | null> {
		try {
			const userRecord = await admin.auth().getUserByEmail(email);
			return {
				uid: userRecord.uid,
				email: userRecord.email as string,
				displayName: userRecord.displayName as string,
			};
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in getUserByEmail");
			}
			return null;
		}
	}

	async getUserById(id: string): Promise<User | null> {
		try {
			// Step 1: Get the authentication data
			const userRecord = await admin.auth().getUser(id);

			// Step 3: Return combined user data with custom fields
			return {
				uid: userRecord.uid,
				email: userRecord.email as string,
				displayName: userRecord.displayName as string,
			};
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in getUserById");
			}
			return null;
		}
	}

	async createUser(email: string, password: string, displayName: string): Promise<User | null> {
		try {
			const userRecord = await admin.auth().createUser({ email, password, displayName });
			return {
				uid: userRecord.uid,
				email: userRecord.email as string,
				password,
				displayName,
			};
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in createUser");
			}
			return null;
		}
	}

	async updateUser(userId: string, { ...fields }: Partial<User>): Promise<void> {
		try {
			await admin.auth().updateUser(userId, { ...fields });
		} catch (error) {
			if (isError(error)) {
				logger.error(error.message);
			} else {
				logger.error("Something went wrong in updateUser");
			}
			throw error;
		}
	}
}

export default new UserRepository();
