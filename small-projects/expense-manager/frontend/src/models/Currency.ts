// Interface
import { ICurrency } from "./Currency.d";

// Base class
import SelectFieldOption from "./SelectFieldOption";

class Currency extends SelectFieldOption implements ICurrency {
	constructor(public text: string, public value: string) {
		super(text, value);
	}
}

export default Currency;
