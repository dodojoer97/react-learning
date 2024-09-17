import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the OpenState interface with openSet as an array
interface OpenState {
	openSet: string[]; // Store as an array
}

const initialState: OpenState = {
	openSet: [], // Initialize as an empty array
};

// Helper functions to manage the array as a set
const addToSet = (arr: string[], id: string) => {
	const set = new Set(arr);
	set.add(id);
	return Array.from(set);
};

const removeFromSet = (arr: string[], id: string) => {
	const set = new Set(arr);
	set.delete(id);
	return Array.from(set);
};

// Create the slice
const openSlice = createSlice({
	name: "open",
	initialState,
	reducers: {
		open: (state, action: PayloadAction<string>) => {
			state.openSet = addToSet(state.openSet, action.payload);
		},
		close: (state, action: PayloadAction<string>) => {
			state.openSet = removeFromSet(state.openSet, action.payload);
		},
		toggleOpen: (state, action: PayloadAction<string>) => {
			if (state.openSet.includes(action.payload)) {
				state.openSet = removeFromSet(state.openSet, action.payload);
			} else {
				state.openSet = addToSet(state.openSet, action.payload);
			}
		},
	},
});

// Selector to check if a particular ID is open
export const isOpen = (id: string) => (state: { open: OpenState }) => {
	const openSetArray = state.open.openSet;
	const openSet = new Set(openSetArray);
	return openSet.has(id);
};

// Export actions and reducer
export const { open, close, toggleOpen } = openSlice.actions;
export default openSlice.reducer;
