import { admin } from "../config/firebase";
import { User } from "../models/User";

class UserRepository {
	async getUserByEmail(email: string): Promise<User | null> {
		try {
			const userRecord = await admin.auth().getUserByEmail(email);
			console.log("userRecordL ", userRecord);
			return {
				uid: userRecord.uid,
				email: userRecord.email,
			};
		} catch (error) {
			console.error("getUserByEmail error: ", error);
			return null;
		}
	}

	async createUser(email: string, password: string): Promise<User | null> {
		try {
			const userRecord = await admin.auth().createUser({ email, password });
			return { uid: userRecord.uid, email: userRecord.email, password };
		} catch (error) {
			console.error("createUser error: ", error);
			return null;
		}
	}
}

export default new UserRepository();
