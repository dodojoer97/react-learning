import { admin } from "../config/firebase";
import { User } from "../models/User";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

class UserRepository {
	async getUserByEmail(email: string): Promise<User | null> {
		try {
			const userRecord = await admin.auth().getUserByEmail(email);
			return {
				...userRecord,
				uid: userRecord.uid,
				email: userRecord.email as string,
				displayName: userRecord.displayName as string,
			};
		} catch (error) {
			console.error("getUserByEmail error: ", error);
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
			console.error("createUser error: ", error);
			return null;
		}
	}

	async updateUser(userId: string, { ...fields }: Partial<User>): Promise<void> {
		try {
			await admin.auth().updateUser(userId, { ...fields });
		} catch (error) {
			console.error("updateUser error: ", error);
			throw error;
		}
	}
}

export default new UserRepository();
