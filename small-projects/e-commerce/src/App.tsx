import { useState, FC } from "react";

// CSS
import "./App.css";

// Types
import { IProduct } from "./types";

// Components
import Header from "@/components/Header";
import Product from "@/components/Product";
import Modal from "@/components/Modal";
import Cart from "@/components/Cart";

// Context
import { CartContextProvider } from "@/store/shopping-cart-context";

// Data
import products from "@/data/products";

const App: FC = () => {
	const [isCartModalOpen, setIsCartModalOpen] = useState<boolean>(false);

	const handleOpenCartModal = (): void => {
		setIsCartModalOpen(true);
	};

	const handleCloseCartModal = (): void => {
		setIsCartModalOpen(false);
	};

	return (
		<CartContextProvider>
			<Modal open={isCartModalOpen} onClose={handleCloseCartModal}>
				<Cart />
			</Modal>
			<Header openCart={handleOpenCartModal} />
			<div id="products" className="container mx-auto md:p-40">
				{products.map((product: IProduct) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</CartContextProvider>
	);
};

export default App;
