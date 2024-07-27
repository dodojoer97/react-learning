export interface Category {
	icon: string;
	name: string;
	userId: string;
}

type GetCategoriesDTO = Category[];

export default GetCategoriesDTO;
