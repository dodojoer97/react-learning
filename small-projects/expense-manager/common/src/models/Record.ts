import { CategoryType } from "./Category";

export interface IRecord {
	id: string;
	userId: string;
	amount: number;
	date: Date;
	categoryId: string;
	type: CategoryType;
	description?: string;
}

export class Record implements IRecord {
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
