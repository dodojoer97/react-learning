// src/repositories/RecordRepository.ts
import { adminDb } from "../config/firebase";
import { Record } from "@common";
class RecordRepository {
	private recordsCollection = adminDb.collection("records");

	async addRecord(record: Record): Promise<void> {
		const RecordDoc = this.recordsCollection.doc(record.id);
		await RecordDoc.set(record);
	}

	async getRecordsByUser(userId: string): Promise<Record[]> {
		const snapshot = await this.recordsCollection.where("userId", "==", userId).get();
		return snapshot.docs.map((doc: any) => doc.data() as Record);
	}
}

export default new RecordRepository();
