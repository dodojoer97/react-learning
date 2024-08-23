import type { Category } from "@common";
import SelectFieldOption from "@/models/SelectFieldOption";
import { ILoadingContext } from "@/types/common/index";

type CategoryMode = "page" | "panel";

export interface ISettingsContext extends ILoadingContext {
	currency: Currency;
	availableCurrencies: SelectFieldOption[];
	availableCategoryTypes: SelectFieldOption[];
	categories: Category[];
	categoryMode: CategoryMode;
	addCategory: (category: Category) => Promise<void>;
	formatAmount: (amount: number) => string;
	setCurrency: (currency: Currency) => void;
	fetchCategories: () => Promise<void>;
	editCategory: (categoryId: string, newName: string) => Promise<void>;
	setCategoryMode: (mode: CategoryMode) => void;
}
