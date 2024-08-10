export interface IGroupItem {
	type: string;
	// Additional properties can be defined here
}

export interface IGroupedItem<T extends IGroupItem> {
	type: string;
	values: T[];
}
