// src/services/RecordService.ts
import RecordRepository from "../repositories/RecordRepository";
import { Record } from "@common";

class RecordService {
	async createRecord(Record: Record): Promise<void> {
		await RecordRepository.addRecord(Record);
	}

	async fetchRecordsByUser(userId: string): Promise<Record[]> {
		return await RecordRepository.getRecordsByUser(userId);
	}
}

export default new RecordService();
