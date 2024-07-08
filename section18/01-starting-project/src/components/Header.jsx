import { useContext } from "react";

// Assets
import logoImg from "../assets/logo.jpg";

// Components
import Button from "./UI/Button";

// Store
import {CartContext} from "../store/CartContext"


export default function Header() {
	const context = useContext(CartContext)
	return (
		<header id="main-header">
			<div id="title">
				<img src={logoImg} alt="restaurant" />
				<h1>ReactFood</h1>
			</div>
			<nav>
				<Button textOnly>Cart ({context.items.length})</Button>
			</nav>
		</header>
	);
}
