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
		if (user?.uid) {
			try {
				setLoading(true);
				setCategories((currentCategories) => [...currentCategories, category]);

				await settingsService.createCategory(category, user.uid);

				setLoading(false);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			} finally {
				setLoading(false);
			}
		}
	};

	const fetchCategories = async (): Promise<void> => {
		if (user?.uid) {
			try {
				setLoading(true);
				const fetchedCategories: Category[] =
					(await settingsService.getCategories(user.uid)) || [];

				setCategories(fetchedCategories);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			} finally {
				setLoading(false);
			}
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
	};

	return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;
