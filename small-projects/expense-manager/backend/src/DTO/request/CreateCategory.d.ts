import { CategoryType } from "@common";

export interface ICreateCateogry {
	category: {
		name: string;
		icon: string;
		type: CategoryType;
	};
	userId: string;
}
