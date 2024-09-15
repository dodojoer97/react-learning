// React
import { useState, useEffect, useContext, useMemo, useCallback } from "react";
import type { FC, PropsWithChildren, Context } from "react";
import { createContext } from "react";

// Interface
import { CategoryMode, ISettingsContext } from "./SettingsContext.d";
import SelectFieldOption from "@/models/SelectFieldOption";

// Models
import { Category } from "@common";

// Data
import currencies from "@/data/currencies";
import categoryTypes from "@/data/categoryTypes";

// Service
import SettingsService from "@/services/SettingsService";
import { AuthContext } from "./AuthContext";

export const SettingsContext: Context<ISettingsContext> = createContext<ISettingsContext>({
	currency: currencies[0],
	availableCurrencies: currencies,
	availableCategoryTypes: categoryTypes,
	categories: [],
	categoryMode: "page",
	loading: false,
	formatAmount: () => "",
	addCategory: async () => {},
	setCurrency: () => {},
	fetchCategories: async () => {},
	editCategory: async () => {},
	setCategoryMode: (mode: CategoryMode) => {},
});

const SettingsContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useContext(AuthContext);
	const settingsService = new SettingsService();

	// State
	const [currency, setCurrency] = useState<SelectFieldOption>(currencies[0]);
	const [availableCurrencies, setAvailableCurrencies] = useState<SelectFieldOption[]>(currencies);
	const [availableCategoryTypes, setAvailableCategoryTypes] =
		useState<SelectFieldOption[]>(categoryTypes);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [categoryMode, setCategoryMode] = useState<CategoryMode>("page");

	// Methods
	const formatAmount = useCallback(
		(amount: number): string => {
			return new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: currency.value,
			}).format(amount);
		},
		[currency]
	);

	const addCategory = useCallback(
		async (category: Category): Promise<void> => {
			if (!user?.uid) throw new Error("User id is mandatory in addCategory");
			try {
				setLoading(true);

				const fetchedCategories: Category[] = await settingsService.createCategory(
					category,
					user.uid
				);

				setCategories(fetchedCategories);
				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[user?.uid, settingsService]
	);

	const fetchCategories = useCallback(async (): Promise<void> => {
		if (!user?.uid) throw new Error("User id is mandatory in fetchCategories");

		try {
			setLoading(true);
			const fetchedCategories: Category[] = await settingsService.getCategories(user.uid);
			setCategories(fetchedCategories || []);
		} catch (error) {
			console.error("Failed to fetch categories:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	}, [user?.uid, settingsService]);

	const editCategory = useCallback(
		async (categoryId: string, newName: string): Promise<void> => {
			if (!user?.uid) throw new Error("User id is mandatory in editCategory");

			try {
				setLoading(true);

				await settingsService.editCategory(user.uid, categoryId, newName);

				// Update the state with the new category name
				setCategories((currentCategories) =>
					currentCategories.map((category) =>
						category.id === categoryId ? { ...category, name: newName } : category
					)
				);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
				throw error;
			} finally {
				setLoading(false);
			}
		},
		[user?.uid, settingsService]
	);

	// Memoize context value to avoid unnecessary re-renders
	const contextValue = useMemo(
		() => ({
			currency,
			availableCurrencies,
			availableCategoryTypes,
			categories,
			loading,
			categoryMode,
			formatAmount,
			addCategory,
			setCurrency,
			fetchCategories,
			editCategory,
			setCategoryMode,
		}),
		[
			currency,
			availableCurrencies,
			availableCategoryTypes,
			categories, // Ensure this is memoized correctly
			loading,
			categoryMode,
			formatAmount,
			addCategory,
			setCurrency,
			fetchCategories,
			editCategory,
		]
	);

	return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;
