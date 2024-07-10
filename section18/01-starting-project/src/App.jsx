// Components
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart"
import Checkout from "./components/Checkout"

// Store
import {CartContextProvider}  from "./store/CartContext";
import { UserProgressContextContextProvider } from "./store/UserProgressContext";

function App() {
	return (
		<>
			<UserProgressContextContextProvider>
				<CartContextProvider>
					<Cart />
					<Checkout />
					<Header />
					<Meals />
				</CartContextProvider>
			</UserProgressContextContextProvider>
		</>
	);
}

export default App;
