// src/controllers/TransactionController.ts
import { Request, Response } from "express";
import TransactionService from "../services/TransactionService";
import { Transaction } from "@common";

// UUID
import { v4 } from "uuid";

// DTO
import CreateTransactionDTO from "@/DTO/request/CreateTransaction";

class TransactionController {
	async addTransaction(req: Request, res: Response): Promise<void> {
		try {
			const data: CreateTransactionDTO = req.body;
			const { transaction } = data;

			const transactionModel = new Transaction(
				v4(),
				transaction.userId,
				transaction.amount,
				transaction.date,
				transaction.categoryId,
				transaction.type,
				transaction.description
			);

			await TransactionService.createTransaction(transactionModel);
			res.status(201).send(transaction);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async getTransactionsByUser(req: Request, res: Response): Promise<void> {
		try {
			const { userId } = req.params;
			const Transactions = await TransactionService.fetchTransactionsByUser(userId);
			res.status(200).send(Transactions);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export default new TransactionController();