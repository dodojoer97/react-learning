import { ISelectFieldOption } from "./SelectFieldOption.d";

class SelectFieldOption implements ISelectFieldOption {
	constructor(public text: string, public value: string) {}
}

export default SelectFieldOption;
