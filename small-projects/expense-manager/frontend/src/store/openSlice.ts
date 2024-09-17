import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface
export interface OpenState {
	openSet: Set<string>;
}

// Initial state
const initialState: OpenState = {
	openSet: new Set(),
};

// Slice definition
const openSlice = createSlice({
	name: "open",
	initialState,
	reducers: {
		toggleOpen: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			if (state.openSet.has(id)) {
				state.openSet.delete(id);
			} else {
				state.openSet.add(id);
			}
		},
		open: (state, action: PayloadAction<string>) => {
			state.openSet.add(action.payload);
		},
		close: (state, action: PayloadAction<string>) => {
			state.openSet.delete(action.payload);
		},
	},
});

// Export actions and reducer
export const { toggleOpen, open, close } = openSlice.actions;
export default openSlice.reducer;
