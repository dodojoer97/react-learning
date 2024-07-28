// Interface
import { ICreateCateogry } from "./CreateCategory.d";

class CreateCategoryDTO implements ICreateCateogry {
	constructor(public category: { name: string; icon: string }, public userId: string) {}
}

export default CreateCategoryDTO;
