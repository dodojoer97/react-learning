import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type CategoryType = "income" | "expense";

export interface ICategory {
	icon: string | IconDefinition;
	name: string;
	id: string;
	type: CategoryType;
}
