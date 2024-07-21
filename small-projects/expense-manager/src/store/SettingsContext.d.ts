import type { Category } from "@/models/Category";

export interface ISettingsContext {
	currency: Currency;
	availableCurrencies: Currency[];
	categories: Category[];
	loading: boolean
	addCategory: (category: Category, userId: string) => void;
	formatAmount: (amount: number) => string;
	setCurrency: (currency: Currency) => void;
	fetchCategories: () => void;
}
