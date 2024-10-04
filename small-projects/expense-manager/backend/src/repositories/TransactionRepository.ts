// src/repositories/TransactionRepository.ts
import { adminDb } from "../config/firebase";
import { QuerySnapshot, DocumentData } from "firebase-admin/firestore";
import { Transaction } from "@common";
import { getSum } from "@/utils/utils";

class TransactionRepository {
	private recordsCollection = adminDb.collection("records");

	async addTransaction(record: Transaction): Promise<void> {
		const transactionDoc = this.recordsCollection.doc(record.id);
		await transactionDoc.set(record);
	}

	async getTransactionsByUser(
		userId: string,
		startDate?: string,
		endDate?: string,
		completedOnly?: string | boolean,
		plannedOnly?: string | boolean
	): Promise<Transaction[]> {
		let query = this.recordsCollection
			.where("userId", "==", userId)
			.orderBy("createdAt", "desc"); // Ordering by createdAt in descending order

		if (startDate) {
			const start = new Date(startDate).toISOString();
			query = query.where("date", ">=", start);
		}

		if (endDate) {
			const end = new Date(endDate).toISOString();
			query = query.where("date", "<=", end);
		}

		if (completedOnly) {
			query = query.where("status", "==", "completed");
		}

		if (plannedOnly) {
			query = query.where("status", "==", "planned");
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

	// Delete a transaction for a specific user
	async deleteTransactionForUser(transactionId: string, userId: string): Promise<void> {
		const snapshot = await this.getTransactionSnapshotForUser(transactionId, userId);
		if (!snapshot.empty) {
			const docRef = snapshot.docs[0].ref;
			await docRef.delete(); // Delete the document
		} else {
			throw new Error(`Transaction does not exist for the provided user`);
		}
	}

	// Get a users balance
	async getBalance(userId: string, startDate?: string, endDate?: string): Promise<number> {
		try {
			// Get only completed, to be able to calculate balance correctly
			const completedOnly = true;

			// Get all the transactions for the specified user
			const transactions: Transaction[] = await this.getTransactionsByUser(
				userId,
				startDate,
				endDate,
				completedOnly
			);

			// Initialize sums
			let incomeSum = 0;
			let expenseSum = 0;

			// Calculate income and expense in one loop
			transactions.forEach((transaction: Transaction) => {
				if (transaction.type === "expense") {
					expenseSum += transaction.amount;
				} else if (transaction.type === "income") {
					incomeSum += transaction.amount;
				}
			});

			// The incomes sum - the expenseSum sum gets us the balance
			return incomeSum - expenseSum;
		} catch (err) {
			throw new Error(`error getting balance the provided user: ${err}`);
		}
	}
}

export default new TransactionRepository();
