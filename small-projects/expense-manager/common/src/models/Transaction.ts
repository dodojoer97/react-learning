import { CategoryType } from "./Category";

export interface ITransaction {
	id: string;
	userId: string;
	amount: number;
	date: string;
	categoryId: string;
	type: CategoryType;
	createdAt: string; // Add this line for the timestamp
	description?: string;
}
export type MandatoryTransactionFields = keyof Omit<ITransaction, "description">;

export class Transaction implements ITransaction {
	constructor(
		public id: string,
		public userId: string,
		public amount: number,
		public date: string,
		public categoryId: string,
		public type: CategoryType,
		public description?: string,
		public createdAt: string = new Date().toISOString() // Default to the current timestamp
	) {}
}
