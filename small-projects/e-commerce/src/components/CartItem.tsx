import { FC, useContext } from "react";

// Context
import { CartContext } from "@/store/shopping-cart-context";

// Types
import { ICartItem } from "@/types";

const CartItem: FC<ICartItem> = ({ id, title, price, quantity, image }) => {
	const { updatedItemQuantity } = useContext(CartContext);

	const totalPrice: number = price * quantity;
	return (
		<>
			<article className="flex justify-evenly items-center px-10">
				<div className="product-image-container">
					<p>{title}</p>
					<img className="flex-none rounded-md bg-slate-100 h-20 w-20" src={image} alt="image" />
				</div>
				<div className="button-container flex justify-evenly items-center gap-2">
					<button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => updatedItemQuantity(id, -1)}>
						-
					</button>
					<div>{quantity}</div>
					<button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={() => updatedItemQuantity(id, 1)}>
						+
					</button>
				</div>
				<div className="price-container">{totalPrice} $</div>
			</article>
		</>
	);
};

export default CartItem;
