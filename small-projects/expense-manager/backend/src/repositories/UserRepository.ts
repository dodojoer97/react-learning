import { admin, adminDb } from "../config/firebase";
import { User } from "@common";

interface AdditionalUserData {
	currency: string;
}

class UserRepository {
	private userCollection = adminDb.collection("users");

	async getUserByEmail(email: string): Promise<User | null> {
		try {
			// Step 1: Get the authentication data
			const userRecord = await admin.auth().getUserByEmail(email);

			// Step 2: Retrieve additional data from Firestore
			const userDocRef = this.userCollection.doc(userRecord.uid);
			const userDoc = await userDocRef.get(); // Corrected Firestore retrieval

			let additionalData: AdditionalUserData = { currency: "" };

			if (userDoc.exists) {
				additionalData = userDoc.data() as AdditionalUserData;
			}

			// Step 3: Return combined user data with custom fields
			return {
				uid: userRecord.uid,
				email: userRecord.email as string,
				displayName: userRecord.displayName as string,
				...additionalData, // Includes additional custom fields like currency
			};
		} catch (error) {
			console.error("getUserByEmail error: ", error);
			return null;
		}
	}

	async createUser(email: string, password: string, displayName: string): Promise<User | null> {
		try {
			const userRecord = await admin.auth().createUser({ email, password, displayName });

			// Create user document in Firestore with custom fields
			const userDoc = this.userCollection.doc(userRecord.uid);
			await userDoc.set({ currency: "$" }); // Set default currency field

			return {
				uid: userRecord.uid,
				email: userRecord.email as string,
				password,
				displayName,
				currency: "$",
			};
		} catch (error) {
			console.error("createUser error: ", error);
			return null;
		}
	}

	async updateUser(userId: string, { ...fields }: Partial<User>): Promise<void> {
		try {
			await admin.auth().updateUser(userId, { ...fields });

			// If updating custom fields, update them in Firestore as well
			const userDocRef = this.userCollection.doc(userId);
			await userDocRef.set({ ...fields }, { merge: true }); // Merge updates to retain existing data
		} catch (error) {
			console.error("updateUser error: ", error);
			throw error;
		}
	}
}

export default new UserRepository();
