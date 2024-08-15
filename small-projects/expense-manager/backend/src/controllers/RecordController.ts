// src/controllers/RecordController.ts
import { Request, Response } from "express";
import RecordService from "../services/RecordService";
import { Record } from "@common";

// UUID
import { v4 } from "uuid";

// DTO
import CreateRecordDTO from "@/DTO/request/CreateRecord";

class RecordController {
	async addRecord(req: Request, res: Response): Promise<void> {
		try {
			const data: CreateRecordDTO = req.body;
			const { record } = data;

			const recordModel = new Record(
				v4(),
				record.userId,
				record.amount,
				record.date,
				record.categoryId,
				record.type,
				record.description
			);

			await RecordService.createRecord(recordModel);
			res.status(201).send(record);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async getRecordsByUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const Records = await RecordService.fetchRecordsByUser(userId);
			res.status(200).send(Records);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export default new RecordController();
