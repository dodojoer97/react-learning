import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [
        { title: 'Test Item', quantity: 3, total: 18, price: 6 }
    ],
    isDisplayed: true
};

// Create a slice that handles the state and actions
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            // Logic to add an item
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.title === newItem.title);
            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                existingItem.total += newItem.price * newItem.quantity;
            } else {
                state.items.push({
                    title: newItem.title,
                    quantity: newItem.quantity,
                    price: newItem.price,
                    total: newItem.price * newItem.quantity
                });
            }
        },
        decreaseQuantity(state, action) {
            // Logic to decrease item quantity
            const title = action.payload;
            const existingItem = state.items.find(item => item.title === title);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                existingItem.total -= existingItem.price;
            } else {
                state.items = state.items.filter(item => item.title !== title);
            }
        },
        toggleCart(state) {
            // Logic to toggle the cart visibility
            state.isDisplayed = !state.isDisplayed;
        }
    }
});

// Export the actions
export const { addItem, decreaseQuantity, toggleCart } = cartSlice.actions;

// Configure the store
const store = configureStore({
    reducer: cartSlice.reducer
});

export default store;
