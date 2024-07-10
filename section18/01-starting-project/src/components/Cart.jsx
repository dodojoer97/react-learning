import { useContext } from "react";

// Store
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

// Components
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartItem from "./CartItem";

// Util
import { currencyFormater } from "../util/formatting";

export default function Cart() {
	const cartContext = useContext(CartContext);
	const userProgressContext = useContext(UserProgressContext);

	const cartTotal = cartContext.items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

	const isOpen = userProgressContext.progress === "cart";

	function handleCloseCart() {
		userProgressContext.hideCart();
	}

	function handleGoToCheckout() {
		userProgressContext.showCheckout()
	}

	return (
		<Modal className="cart" open={isOpen} onClose={isOpen ? handleCloseCart : null}>
			<h2>Your Cart</h2>
			<ul>
				{cartContext.items.map((item) => (
					<CartItem
						key={item.id}
						name={item.name}
						price={item.price}
						quantity={item.quantity}
						onIncrease={() => cartContext.addItem(item)}
						onDecrease={() => cartContext.removeItem(item.id)}
					/>
				))}
			</ul>
			<p className="cart-total">{currencyFormater.format(cartTotal)}</p>
			<p className="modal-actions">
				<Button onClick={handleCloseCart} textOnly>
					Close
				</Button>
				{cartContext.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to checkout</Button>}
			</p>
		</Modal>
	);
}
