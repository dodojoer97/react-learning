// React
import { useState, useEffect, useContext } from "react";
import type { FC, PropsWithChildren, Context } from "react";
import { createContext } from "react";

// Interface
import { ISettingsContext } from "./SettingsContext.d";
import Currency from "@/models/Currency";

// Models
import Category from "@/models/Category";

// Data
import currencies from "@/data/currencies";

// Service
import SettingsService from "@/services/SettingsService";
import { AuthContext } from "./AuthContext";

export const SettingsContext: Context<ISettingsContext> = createContext<ISettingsContext>({
	currency: currencies[0],
	availableCurrencies: currencies,
	categories: [],
	loading: false,
	formatAmount: () => "",
	addCategory: async () => {},
	setCurrency: () => {},
	fetchCategories: async () => {},
	editCategory: async () => {},
});

const SettingsContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useContext(AuthContext);
	const settingsService = new SettingsService();

	// State
	const [currency, setCurrency] = useState<Currency>(currencies[0]);
	const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(currencies);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	// Methods
	const formatAmount = (amount: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency.value,
		}).format(amount);
	};

	const addCategory = async (category: Category): Promise<void> => {
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
	};

	const fetchCategories = async (): Promise<void> => {
		if (!user?.uid) throw new Error("User id is mandatory in fetchCategories");

		try {
			setLoading(true);
			const fetchedCategories: Category[] =
				(await settingsService.getCategories(user.uid)) || [];

			setCategories(fetchedCategories);
		} catch (error) {
			console.error("Failed to fetch categories:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const editCategory = async (categoryId: string, newName: string): Promise<void> => {
		if (!user?.uid) throw new Error("User id is mandatory in editCategory");

		try {
			setLoading(true);

			await settingsService.editCategory(user.uid, categoryId, newName);

			// Update the state with the new category name
			setCategories((currentCategories) => {
				return currentCategories.map((category) =>
					category.id === categoryId ? { ...category, name: newName } : category
				);
			});
		} catch (error) {
			console.error("Failed to fetch categories:", error);
			throw error;
		} finally {
			setLoading(false);
		}
	};

	// Values
	const contextValue: ISettingsContext = {
		currency,
		availableCurrencies,
		categories,
		loading,
		formatAmount,
		addCategory,
		setCurrency,
		fetchCategories,
		editCategory,
	};

	return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;
