import * as redux from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
	counter: 0,
	showCounter: false,
};

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

export const counterActions = counterSlice.actions;


export default counterSlice.reducer