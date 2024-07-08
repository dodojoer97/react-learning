import { useContext } from "react";

// Store
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

// Components
import Modal from "./UI/Modal";
import Button from "./UI/Button";

// Util
import {currencyFormater} from "../util/formatting"

export default function Cart() {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)

    const cartTotal = cartContext.items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price
	}, 0)


    const isOpen = userProgressContext.progress === 'cart'
    return <Modal className="cart" open={isOpen}>
        <h2>Your Cart</h2>
        <ul>
            {cartContext.items.map(item => <li key={item.id}>{item.name} - {item.quantity}</li>)}
        </ul>
        <p className="cart-total">{currencyFormater.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly>Close</Button>
            <Button>Go to checkout</Button>
        </p>
    </Modal>
}