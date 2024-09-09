import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import Cart from "./components/Cart/Cart"
import Layout from "./components/Layout/Layout"
import Products from "./components/Shop/Products"
import Notification from "./components/UI/Notification"

// Store
import { uiActions } from "./store/ui-slice"

let isInitial = true

function App() {
	const dispatch = useDispatch()
	const showCart = useSelector((state) => state.ui.cartIsVisible)
	const cart = useSelector((state) => state.cart)
  const notification = useSelector((state) => state.ui.notification)

	useEffect(() => {
		const sendCartData = async () => {
			dispatch(
				uiActions.showNotification({
					status: "pending",
					title: "Sending..",
					message: "Sendind cart data!",
				})
			)

			const response = await fetch(
				"https://react-learning-43eb6-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify(cart),
				}
			)

			if (!response.ok) {
				throw new Error("SEndinf car data failed")
			}

			dispatch(
				uiActions.showNotification({
					status: "success",
					title: "Sent",
					message: "Sent cart data!",
				})
			)
		}

    if(isInitial) {
      isInitial = false
      return
    }
    
		sendCartData().catch((err) => {
			dispatch(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					message: "Sending cart data failed!",
				})
			)
		})
	}, [cart, dispatch])

	return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
		<Layout>
			{showCart && <Cart />}
			<Products />
		</Layout>

    </>
	)
}

export default App
