export interface IGroupItem {
	type: string;
	// Additional properties can be defined here
}

export interface IGroupedItem<T> {
	type: string;
	values: T[];
}
