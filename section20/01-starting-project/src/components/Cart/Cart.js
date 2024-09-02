import Card from "../UI/Card"
import classes from "./Cart.module.css"
import CartItem from "./CartItem"

// Store
import { useSelector } from "react-redux"

const Cart = (props) => {
	const isDisplayed = useSelector((state) => state.isDisplayed)
	const items = useSelector((state) => state.items)

	return (
		<>
			{isDisplayed && (
				<Card className={classes.cart}>
					<h2>Your Shopping Cart</h2>
					<ul>
						{items.map((item) => (
							<CartItem
								key={item.title}
								item={item}
							/>
						))}
					</ul>
				</Card>
			)}
		</>
	)
}

export default Cart
