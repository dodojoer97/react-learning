import { CategoryType } from "./Category";

export interface ITransaction {
	id: string;
	userId: string;
	amount: number;
	date: Date;
	categoryId: string;
	type: CategoryType;
	description?: string;
}

export type MandatoryTransactionFields = keyof Omit<ITransaction, "description">;

export class Transaction implements ITransaction {
	constructor(
		public id: string,
		public userId: string,
		public amount: number,
		public date: Date,
		public categoryId: string,
		public type: CategoryType,
		public description?: string
	) {}
}
