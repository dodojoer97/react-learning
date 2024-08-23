import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter"
import authReducer from "./auth"

const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
	},
});

// *** subscribe ***
// const counterSubscriber = () => {
// 	const state = store.getState();
// };

// store.subscribe(counterSubscriber);

export default store;
