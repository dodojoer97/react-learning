// React
import { useState } from "react";
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
