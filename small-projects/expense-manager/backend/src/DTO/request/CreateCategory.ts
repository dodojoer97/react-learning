// Interface
import { CategoryType } from "@common";
import { ICreateCateogry } from "./CreateCategory.d";

class CreateCategoryDTO implements ICreateCateogry {
	constructor(
		public category: { name: string; icon: string; type: CategoryType },
		public userId: string
	) {}
}

export default CreateCategoryDTO;
