// src/repositories/TransactionRepository.ts
import { adminDb } from "../config/firebase";
import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { Transaction } from "@common";

class TransactionRepository {
	private recordsCollection = adminDb.collection("records");

	async addTransaction(record: Transaction): Promise<void> {
		const transactionDoc = this.recordsCollection.doc(record.id);
		await transactionDoc.set(record);
	}

	async getTransactionsByUser(
		userId: string,
		startDate?: Date,
		endDate?: Date
	): Promise<Transaction[]> {
		let query = this.recordsCollection
			.where("userId", "==", userId)
			.orderBy("createdAt", "desc"); // Ordering by createdAt in descending order

		if (startDate) {
			query = query.where("date", ">=", startDate);
		}

		if (endDate) {
			query = query.where("date", "<=", endDate);
		}

		const snapshot = await query.get();
		return snapshot.docs.map((doc) => doc.data() as Transaction);
	}

	// Get transaction snapshot for a specific user
	async getTransactionSnapshotForUser(
		transactionId: string,
		userId: string
	): Promise<QuerySnapshot<DocumentData>> {
		const snapshot = await this.recordsCollection
			.where("id", "==", transactionId)
			.where("userId", "==", userId)
			.get();
		return snapshot;
	}

	// Edit a transaction for a specific user
	async editTransactionForUser(
		snapshot: QuerySnapshot<DocumentData>, // Pass the snapshot directly
		newTransactionData: Partial<Transaction>
	): Promise<void> {
		if (!snapshot.empty) {
			// Assuming only one document is returned since id should be unique
			const docRef = snapshot.docs[0].ref;
			await docRef.update(newTransactionData);
		} else {
			throw new Error(`Transaction does not exist for the provided user`);
		}
	}
}

export default new TransactionRepository();
