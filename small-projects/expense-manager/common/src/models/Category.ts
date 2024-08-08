// Interface
import { ICategory, CategoryType } from "./Category.d";

// FontAwesome
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export class Category implements ICategory {
	constructor(
		public icon: string | IconDefinition,
		public name: string,
		public id: string,
		public type: CategoryType
	) {}
}
