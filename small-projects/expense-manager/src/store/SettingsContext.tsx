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

// MOCK
import initialCategories from "@/MOCK/initialCategories";

// Service
import SettingsService from "@/services/SettingsService";

// Store
import { AuthContext } from "./AuthContext";

export const SettingsContext: Context<ISettingsContext> = createContext<ISettingsContext>({
	currency: currencies[0],
	availableCurrencies: currencies,
	categories: [],
	formatAmount: () => "",
	addCategory: () => {},
	setCurrency: () => {},
});

const SettingsContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const settingsService = new SettingsService();

	const { user } = useContext(AuthContext); // Access user from AuthContext

	// State
	const [currency, setCurrency] = useState<Currency>(currencies[0]);
	const [availableCurrencies, setAvailableCurrencies] = useState<Currency[]>(currencies);
	const [categories, setCategories] = useState<Category[]>(initialCategories);

	// Methods
	const formatAmount = (amount: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency.value,
		}).format(amount);
	};

	const addCategory = async (category: Category, userId: string): Promise<void> => {
		const updatedCategories: Category[] = [...categories, category];
		setCategories(updatedCategories);
		await settingsService.setCategories(updatedCategories, userId);
	};

	const handleSetCurrency = (currency: Currency): void => {
		setCurrency(currency);
	};

	// Fetch categories from backend on mount
	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			if (user?.id) {
				try {
					const fetchedCategories = await settingsService.getCategories(user.id);
					setCategories(fetchedCategories);
				} catch (error) {
					console.error("Failed to fetch categories:", error);
				}
			}
		};

		fetchCategories();
	}, [user]);

	// Values
	const contextValue: ISettingsContext = {
		currency,
		availableCurrencies,
		categories,
		formatAmount,
		addCategory,
		setCurrency: handleSetCurrency,
	};

	return <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;
