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
	recurring?: IRecurringTransaction; // Add this line for recurring transaction support
}

// Define mandatory fields excluding optional properties
export type MandatoryTransactionFields = keyof Omit<ITransaction, "description" | "recurring">;

// Transaction class implementation with default values for status and createdAt
export class Transaction implements ITransaction {
	constructor(
		public id: string,
		public userId: string,
		public amount: number,
		public date: string,
		public categoryId: string,
		public type: CategoryType,
		public status: "planned" | "completed" = "planned", // Default to 'planned' status
		public description?: string,
		public recurring?: IRecurringTransaction, // Optional recurring field
		public createdAt: string = new Date().toISOString() // Default to the current timestamp
	) {}
}
