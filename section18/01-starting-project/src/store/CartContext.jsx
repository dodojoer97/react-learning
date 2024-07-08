import { act, createContext, useReducer } from "react";

export const CartContext = createContext({
	items: [],
	addItem: (item) => {},
	removeItem: (id) => {},
});

function getExisitingItemIndex(state, id) {
	const exisitingCartItemIndex = state.items.find((item) => item.id === id);
	return exisitingCartItemIndex;
}

function cartReducer(state, action) {
	if (action.type === "ADD_ITEM") {
		// update the state to add a meal item

		const updatedItems = [...state.items];

		const exisitingItemIndex = getExisitingItemIndex(state, action.item.id);

		if (exisitingItemIndex) {
			const exisitingItem = state.items[exisitingItemIndex];
			const updatedItem = {
				...exisitingItem,
				quantity: exisitingItem.quantity + 1,
			};

			updatedItems[exisitingItemIndex] = updatedItem;
		} else {
			updatedItems.push({ ...action.item, quantity: 1 });
		}

		return { ...state, items: updatedItems };
	}

	if (action.type === "REMOVE_ITEM") {
		const exisitingItemIndex = getExisitingItemIndex(state, action.id);

		const exisitingCartItem = state.items[exisitingItemIndex];

		const updatedItems = [...state.items];

		if (exisitingCartItem.quantity === 1) {
			updatedItems.splice(exisitingItemIndex, 1);
		} else {
			const updatedItem = {
				...exisitingCartItem,
				quantity: exisitingCartItem.quantity - 1,
			};

			updatedItems[exisitingItemIndex] = updatedItem;
		}
	}

	return state;
}

export function CartContextProvider({ children }) {
	const [cart, dispatchCartAction] = useReducer(cartReducer, {
		items: [],
	});



	function addItem(item) {
		dispatchCartAction({type: "ADD_ITEM", item})
	}

	function removeItem(id) {
		dispatchCartAction({type: "REMOVE_ITEM", id})
	}

	const cartContext = {
		items: cart.items,
		addItem,
		removeItem
	}

	return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}
