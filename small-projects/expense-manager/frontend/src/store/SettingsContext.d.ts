import type { Category } from "@/models/Category";
import { ILoadingContext } from "@/types/common/index";

export interface ISettingsContext extends ILoadingContext {
	currency: Currency;
	availableCurrencies: Currency[];
	categories: Category[];
	addCategory: (category: Category, userId: string) => void;
	formatAmount: (amount: number) => string;
	setCurrency: (currency: Currency) => void;
	fetchCategories: () => void;
}
