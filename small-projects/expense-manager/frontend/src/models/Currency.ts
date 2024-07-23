// Interface
import { ICurrency } from "./Currency.d";

class Currency implements ICurrency {
	constructor(public text: string, public value: string) {}
}

export default Currency;
