import { currencyFormater } from "../util/formatting";

export default function CartItem({ name, quantity, price }) {
	return (
		<li className="cart-item">
			<p>
				{name} - {quantity} x {currencyFormater.format(price)}
			</p>
			<p className="cart-item-actions">
				<button>-</button>
				<button>{quantity}</button>
				<button>+</button>
			</p>
		</li>
	);
}
