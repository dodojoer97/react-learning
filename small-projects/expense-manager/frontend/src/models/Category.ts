// Interface
import { ICategory } from "./Category.d";

// FontAwesome
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

class Category implements ICategory {
	constructor(public icon: IconDefinition, public name: string, public userId: string) {}
}

export default Category;
