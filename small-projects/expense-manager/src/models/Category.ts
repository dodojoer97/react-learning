// Interface
import { ICategory } from "./Category.d";

class Category implements ICategory {
	constructor(public image: string, public name: string, public id: string) {}
}

export default Category;
