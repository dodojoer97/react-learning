import { createContext, useReducer, FC } from "react";

// Types
import type { Context, ReactNode } from "react";
import { ICartItem, IProduct } from "@/types";

// Data
import products from "@/data/products";

// Interfaces
interface ICartContext {
	items: ICartItem[];
	addItemToCart(productId: string): void;
	updatedItemQuantity(productId: string, quantity: number): void;
}

interface IState {
	items: ICartItem[];
}

enum Action {
	ADD_ITEM = "ADD_ITEM",
	UPDATE_QUANTITY = "UPDATE_QUANTITY",
}

interface IAddPayload {
	productId: string;
}

interface IUpdatePayload {
	productId: string;
	quantity: number;
}

interface IDispatchAction {
	type: Action;
	payload: IAddPayload | IUpdatePayload;
}

// Initial state
const initialState: IState = {
	items: [],
};

export const CartContext: Context<ICartContext> = createContext<ICartContext>({
	items: [],
	addItemToCart() {},
	updatedItemQuantity() {},
});

const shoppingCartReducer = (state: IState, action: IDispatchAction) => {
	const { productId } = action.payload;
	console.log("shoppingCartReducer");
	if (action.type === Action.ADD_ITEM) {
		const updatedItems = [...state.items];

		const existingItemIndex: number | undefined = updatedItems.findIndex((product: ICartItem) => product.id === productId);
		const existingCartItem: ICartItem = updatedItems[existingItemIndex];

		if (existingCartItem) {
			const updatedItem: ICartItem = {
				...existingCartItem,
				quantity: existingCartItem.quantity + 1,
			};
			updatedItems[existingItemIndex] = updatedItem;
		} else {
			const item: IProduct | undefined = products.find((product: IProduct) => product.id === productId);

			if (item) {
				const newItem: ICartItem = {
					id: productId,
					title: item.title,
					description: item.description,
					price: item.price,
					image: item.image,
					quantity: 1,
				};

				updatedItems.push(newItem);
			}
		}

		console.log("updatedItems: ", updatedItems);

		return {
			...state,
			items: updatedItems,
		};
	}

	// TODO add update item quantity
	if (action.type === Action.UPDATE_QUANTITY) {
		const { productId, quantity } = action.payload as IUpdatePayload;

		const updatedItems = [...state.items];
		const existingItemIndex: number | undefined = updatedItems.findIndex((product: ICartItem) => product.id === productId);
		const existingCartItem: ICartItem = updatedItems[existingItemIndex];

		if (!existingCartItem) return { ...state };

		const updatedItem = { ...existingCartItem };
		updatedItem.quantity += quantity;

		if (updatedItem.quantity <= 0) {
			updatedItems.splice(existingItemIndex, 1);
		} else {
			updatedItems[existingItemIndex] = updatedItem;
		}

		return {
			...state,
			items: updatedItems,
		};
	}

	return state;
};

export const CartContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [shoppingCartState, shoppingCartDispatch] = useReducer(shoppingCartReducer, initialState);

	const handleAddItemToCart = (productId: string): void => {
		shoppingCartDispatch({
			type: Action.ADD_ITEM,
			payload: {
				productId,
			},
		});
	};

	const handleUpdateItemQuantity = (productId: string, quantity: number): void => {
		shoppingCartDispatch({
			type: Action.UPDATE_QUANTITY,
			payload: {
				productId,
				quantity,
			},
		});
	};

	const contextValue: ICartContext = {
		items: shoppingCartState.items,
		addItemToCart: handleAddItemToCart,
		updatedItemQuantity: handleUpdateItemQuantity,
	};

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
