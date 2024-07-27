// Interface
import { ICategory } from "./Category.d";
// FontAwesome

export class Category implements ICategory {
	constructor(public icon: string, public name: string) {}
}
