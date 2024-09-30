import { CategoryType } from "./Category";

// Define an interface for Recurring options
export interface IRecurringTransaction {
	isRecurring: boolean; // Whether the transaction is recurring
	frequency?: "daily" | "weekly" | "monthly" | "yearly"; // Frequency of recurrence
	endDate?: string; // Optional end date for recurring transactions
}

export interface ITransaction {
	id: string;
	userId: string;
	amount: number;
	date: string;
	categoryId: string;
	type: CategoryType;
	createdAt: string; // Timestamp when the transaction was created
	description?: string;
	status: "planned" | "completed"; // Status of the transaction
	recurring?: IRecurringTransaction | null; // Add this line for recurring transaction support
}

// Define mandatory fields excluding optional properties
export type MandatoryTransactionFields = keyof Omit<ITransaction, "description" | "recurring">;

// Transaction class implementation with object in constructor
export class Transaction implements ITransaction {
	id: string;
	userId: string;
	amount: number;
	date: string;
	categoryId: string;
	type: CategoryType;
	createdAt: string;
	status: "planned" | "completed";
	description?: string;
	recurring?: IRecurringTransaction | null;

	constructor(transaction: ITransaction) {
		this.id = transaction.id;
		this.userId = transaction.userId;
		this.amount = transaction.amount;
		this.date = transaction.date;
		this.categoryId = transaction.categoryId;
		this.type = transaction.type;
		this.createdAt = transaction.createdAt || new Date().toISOString(); // Default to the current timestamp if not provided
		this.status = transaction.status || "completed"; // Default status to "completed" if not provided
		this.description = transaction.description;
		this.recurring = transaction.recurring;
	}
}
