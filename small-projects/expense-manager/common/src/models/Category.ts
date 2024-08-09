// FontAwesome
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type CategoryType = "expense" | "income";

interface ICategory {
	icon: string | IconDefinition;
	name: string;
	id: string;
	type: CategoryType;
}
export class Category implements ICategory {
	constructor(
		public icon: string | IconDefinition,
		public name: string,
		public id: string,
		public type: CategoryType
	) {}
}
