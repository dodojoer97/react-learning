// src/repositories/TransactionRepository.ts
import { adminDb } from "../config/firebase";
import { Transaction } from "@common";
class TransactionRepository {
	private recordsCollection = adminDb.collection("records");

	async addTransaction(record: Transaction): Promise<void> {
		const TransactionDoc = this.recordsCollection.doc(record.id);
		await TransactionDoc.set(record);
	}

	async getTransactionsByUser(userId: string): Promise<Transaction[]> {
		const snapshot = await this.recordsCollection.where("userId", "==", userId).get();
		return snapshot.docs.map((doc: any) => doc.data() as Transaction);
	}
}

export default new TransactionRepository();
