// Components
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart"

// Store
import {CartContextProvider}  from "./store/CartContext";
import { UserProgressContextContextProvider } from "./store/UserProgressContext";

function App() {
	return (
		<>
			<UserProgressContextContextProvider>
				<CartContextProvider>
					<Header />
					<Cart />
					<Meals />
				</CartContextProvider>
			</UserProgressContextContextProvider>
		</>
	);
}

export default App;
