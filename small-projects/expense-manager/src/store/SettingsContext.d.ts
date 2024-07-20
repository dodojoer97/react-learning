import type { Category } from "@/models/Category";

export interface ISettingsContext {
	currency: Currency;
	availableCurrencies: Currency[];
	categories: Category[];
	addCategory: (category: Category, userId: string) => void;
	getCategories: (userId: string) => Category[];
	formatAmount: (amount: number) => string;
	setCurrency: (currency: Currency) => void;
}
