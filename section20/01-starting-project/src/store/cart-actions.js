import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const response = await fetch(
				"https://react-learning-43eb6-default-rtdb.firebaseio.com/cart.json",
			);

            if(!response.ok) throw new Error("could not feth data")

            const data = await response.json()

            return data
        }

        try {
            const cartData = await fetchData()
            dispatch(cartActions.replaceCart(cartData))
        }catch(err) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Sending cart data failed!",
				})
			);
        }

    }
}

export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(
			uiActions.showNotification({
				status: "pending",
				title: "Sending..",
				message: "Sendind cart data!",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://react-learning-43eb6-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			);

			if (!response.ok) {
				throw new Error("SEndinf car data failed");
			}
		};

		try {
			await sendRequest();

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Sent",
					message: "Sent cart data!",
				})
			);
		} catch (err) {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Sending cart data failed!",
				})
			);
		}
	};
};