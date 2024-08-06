import type { Category } from "@/models/Category";
import { ILoadingContext } from "@/types/common/index";

export interface ISettingsContext extends ILoadingContext {
	currency: Currency;
	availableCurrencies: Currency[];
	categories: Category[];
	addCategory: (category: Category) => Promise<void>;
	formatAmount: (amount: number) => string;
	setCurrency: (currency: Currency) => void;
	fetchCategories: () => Promise<void>;
	editCategory: (category: Category, newName: string) => Promise<void>;
}
