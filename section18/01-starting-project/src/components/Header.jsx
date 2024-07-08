import { useContext } from "react";

// Assets
import logoImg from "../assets/logo.jpg";

// Components
import Button from "./UI/Button";

// Store
import {CartContext} from "../store/CartContext"
import { UserProgressContext } from "../store/UserProgressContext";


export default function Header() {
	const cartContext = useContext(CartContext)
	const userProgressContext = useContext(UserProgressContext)

	const totalCartItems =  cartContext.items.reduce((totalNumberOfItems, item) => {
		return totalNumberOfItems + item.quantity
	}, 0)

	function handleOpenCart() {
		console.log("handleOpenCart")
		userProgressContext.showCart()
	}

	return (
		<header id="main-header">
			<div id="title">
				<img src={logoImg} alt="restaurant" />
				<h1>ReactFood</h1>
			</div>
			<nav>
				<Button onClick={handleOpenCart} textOnly>Cart ({totalCartItems})</Button>
			</nav>
		</header>
	);
}
