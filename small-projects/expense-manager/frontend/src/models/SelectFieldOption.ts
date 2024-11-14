class SelectFieldOption<T extends string> {
	constructor(public label: T, public value: T) {}
}

export default SelectFieldOption;
