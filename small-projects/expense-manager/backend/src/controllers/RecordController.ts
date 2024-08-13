// src/controllers/RecordController.ts
import { Request, Response } from "express";
import RecordService from "../services/RecordService";
import { Record } from "@common";

class RecordController {
	async addRecord(req: Request, res: Response): Promise<void> {
		try {
			const Record: Record = req.body;
			await RecordService.createRecord(Record);
			res.status(201).send(Record);
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
