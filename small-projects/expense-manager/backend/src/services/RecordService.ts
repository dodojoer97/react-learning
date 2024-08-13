// src/services/RecordService.ts
import RecordRepository from "../repositories/RecordRepository";
import { Record } from "@common";

class RecordService {
	async createRecord(record: Record): Promise<void> {
		await RecordRepository.addRecord(record);
	}

	async fetchRecordsByUser(userId: string): Promise<Record[]> {
		return await RecordRepository.getRecordsByUser(userId);
	}
}

export default new RecordService();
