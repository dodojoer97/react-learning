export interface IProduct {
	id: string;
	title: string;
	description: string;
	price: number;
	image: string;
}

export interface ICartItem extends IProduct {
	quantity: number;
}
