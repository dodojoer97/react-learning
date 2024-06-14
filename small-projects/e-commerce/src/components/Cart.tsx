import { FC, useContext } from "react";

// Types
import { ICartItem } from "@/types";

// Context
import { CartContext } from "@/store/shopping-cart-context";

// Components
import CartItem from "./CartItem";

const Cart: FC = () => {
	const { items } = useContext(CartContext);
	console.log("items: ", items);
	return (
		<div id="cart" className="bg-white container">
			{items.map((item: ICartItem) => (
				<CartItem key={item.id} {...item} />
			))}
		</div>
	);
};

export default Cart;
