// src/repositories/UserRepository.ts
import { db } from "../config/firebase";
import { User } from "../models/User";

class UserRepository {
	private usersCollection = db.collection("users");

	async addUser(user: User): Promise<void> {
		const userDoc = this.usersCollection.doc(user.id);
		await userDoc.set(user);
	}

	async getUsers(): Promise<User[]> {
		const snapshot = await this.usersCollection.get();
		return snapshot.docs.map((doc) => doc.data() as User);
	}
}

export default new UserRepository();
