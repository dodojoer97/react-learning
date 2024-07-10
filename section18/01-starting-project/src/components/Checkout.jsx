import { useContext } from "react";

// Components
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";

// Store
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

// Util
import { currencyFormater } from "../util/formatting";

export default function Chekout() {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)

	const cartTotal = cartContext.items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

    return <Modal open={userProgressContext.progress === 'checkout'}>
        <form>
            <h2>checkout</h2>
            <p>Total Amount: {currencyFormater.format(cartTotal)}</p>
            <Input label="Full Name" type="text" id="full-name"/>
            <Input label="Email Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>
            <p className="modal-actions">
                <Button textOnly type="button" onClick={userProgressContext.hideCheckout}>Close</Button>
                <Button>Submit</Button>
            </p>
        </form>
    </Modal>
}