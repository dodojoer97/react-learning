import type { Category } from "@common";
import SelectFieldOption from "@/models/SelectFieldOption";
import { ILoadingContext } from "@/types/common/index";

export interface ISettingsContext extends ILoadingContext {
	currency: Currency;
	availableCurrencies: SelectFieldOption[];
	availableCategoryTypes: SelectFieldOption[];
	categories: Category[];
	addCategory: (category: Category) => Promise<void>;
	formatAmount: (amount: number) => string;
	setCurrency: (currency: Currency) => void;
	fetchCategories: () => Promise<void>;
	editCategory: (categoryId: string, newName: string) => Promise<void>;
}
