export interface IExpense {
	id: string;
	userId: string;
	categoryId: string;
	amount: number;
	description: string;
	date: Date;
}

export class Expense implements IExpense {
	constructor(
		public id: string,
		public userId: string,
		public categoryId: string,
		public amount: number,
		public description: string,
		public date: Date
	) {}
}
