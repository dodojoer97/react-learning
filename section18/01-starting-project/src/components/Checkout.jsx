import { useContext } from "react";

// Components
import Modal from "./UI/Modal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Error from "./Error";

// Store
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";

// Util
import { currencyFormater } from "../util/formatting";

// Hooks
import useHttp from "../hooks/useHttp";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export default function Chekout() {
    const cartContext = useContext(CartContext)
    const userProgressContext = useContext(UserProgressContext)

    const {data, isLoading, error, sendRequest} = useHttp("http://localhost:3000/orders", {...requestConfig})

	const cartTotal = cartContext.items.reduce((totalPrice, item) => {
		return totalPrice + item.quantity * item.price;
	}, 0);

    function handleCloseCheckout() {
        userProgressContext.hideCheckout()
    }

    function handleFinish() {
        handleCloseCheckout()
        cartContext.clearCart()
    }

    function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const customerData = Object.fromEntries(formData.entries())

        sendRequest(
            JSON.stringify(
                {
                    order: {customer: customerData, items: cartContext.items}
                }    
            )
        )
    }

    let actions = (
        <>
            <Button textOnly type="button" onClick={handleCloseCheckout}>Close</Button>
            <Button>Submit</Button>
        </>
    )

    if(isLoading) {
        actions = <span>loading</span>
    }

    if(data && !error) {
        return <Modal  open={userProgressContext.progress === 'checkout'} onClose={handleFinish}>
            <h2>Success</h2>
            <p>Your order was sent</p>
            <p className="modal-actions"><Button onClick={handleFinish}>Okay</Button></p>

        </Modal>
    }


    return <Modal open={userProgressContext.progress === 'checkout'} onClose={handleCloseCheckout}>
        <form onSubmit={handleSubmit}>
            <h2>checkout</h2>
            <p>Total Amount: {currencyFormater.format(cartTotal)}</p>
            <Input label="Full Name" type="text" id="name"/>
            <Input label="Email Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code"/>
                <Input label="City" type="text" id="city"/>
            </div>

            {error && <Error title="Something went wrong" messsage={error}/>}
            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}