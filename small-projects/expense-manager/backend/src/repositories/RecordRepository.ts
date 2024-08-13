// src/repositories/RecordRepository.ts
import { adminDb } from "../config/firebase";
import { Record } from "@common";
class RecordRepository {
	private RecordsCollection = adminDb.collection("Records");

	async addRecord(Record: Record): Promise<void> {
		const RecordDoc = this.RecordsCollection.doc(Record.id);
		await RecordDoc.set(Record);
	}

	async getRecordsByUser(userId: string): Promise<Record[]> {
		const snapshot = await this.RecordsCollection.where("userId", "==", userId).get();
		return snapshot.docs.map((doc: any) => doc.data() as Record);
	}
}

export default new RecordRepository();
