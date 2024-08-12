import { Category } from "./Category";

export interface IRecord {
	id: string;
	userId: string;
	amount: number;
	description: string;
	date: Date;
	category: Category;
}

export class Record implements IRecord {
	constructor(
		public id: string,
		public userId: string,
		public amount: number,
		public description: string,
		public date: Date,
		public category: Category
	) {}
}
