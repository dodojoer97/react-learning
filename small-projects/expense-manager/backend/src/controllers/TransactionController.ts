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
			const { startDate, endDate } = req.query;

			const transactions = await TransactionService.fetchTransactionsByUser(
				userId,
				startDate as string,
				endDate as string
			);
			res.status(200).send(transactions);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async updateTransaction(req: Request, res: Response): Promise<void> {
		try {
			const { transactionId, userId } = req.params;
			const data: Partial<Transaction> = req.body;
			await TransactionService.updateTransactionForUser(userId, transactionId, data);
			res.status(200).send({ message: "Transaction updated successfully" });
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async deleteTransactionForUser(req: Request, res: Response): Promise<void> {
		try {
			const { transactionId, userId } = req.params;
			await TransactionService.deleteTransactionForUser(transactionId, userId);
			res.status(200).send({ message: "Transaction updated successfully" });
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export default new TransactionController();
