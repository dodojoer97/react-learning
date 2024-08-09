import * as redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
	counter: 0,
	showCounter: false,
};

// *** reducer ***
// const counterReducer = (state = initialState, action) => {
// 	if (action.type === "increment") {
// 		return {
// 			...state,
// 			counter: state.counter + 1,
// 		};
// 	}

// 	if (action.type === "increase") {
// 		return {
// 			...state,
// 			counter: state.counter + action.amount,
// 		};
// 	}

// 	if (action.type === "decrement") {
// 		return {
// 			...state,
// 			counter: state.counter - 1,
// 		};
// 	}

// 	if (action.type === "toggle") {
// 		return {
// 			...state,
// 			showCounter: !state.showCounter,
// 		};
// 	}

// 	return state;
// };

// *** With reducer ***
// const store = redux.createStore(counterReducer);

// *** Slice ***
const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter += action.payload;
		},
		toggleCounter(state) {
			console.log("toggleCounter");
			state.showCounter = !state.showCounter;
		},
	},
});

const initialAuthState = {
	isAuthenticated: false,
};

const authSlice = createSlice({
	name: "authentication",
	initialState: initialAuthState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});

const store = configureStore({
	reducer: {
		counter: counterSlice.reducer,
		auth: authSlice.reducer,
	},
});

// *** subscribe ***
// const counterSubscriber = () => {
// 	const state = store.getState();
// };

// store.subscribe(counterSubscriber);

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
