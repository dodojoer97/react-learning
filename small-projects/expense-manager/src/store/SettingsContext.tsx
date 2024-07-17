// React
import { useState } from "react"
import type { FC, PropsWithChildren, Context } from "react"
import { createContext } from "react"

// Interface
import { ISettingsContext } from "./SettingsContext.d"
import { Currency } from "@/data/currency"

// Models
import Category from "@/models/Category"

// Data
import currencies from "@/data/currencies"

// MOCK
import initialCategories from "@/MOCK/initialCategories"

export const SettingsContext: Context<ISettingsContext> =
	createContext<ISettingsContext>({
		currency: currencies[0],
		availableCurrencies: currencies,
		categories: [],
		formatCurrency: () => "",
		addCategory: () => {},
		setCurrency: () => {},
	})

const SettingsContextProvider: FC<PropsWithChildren> = ({ children }) => {
	// State
	const [currency, setCurrency] = useState<Currency>(currencies[0])
	const [availableCurrencies, setAvailableCurrencies] =
		useState<Currency[]>(currencies)
	const [categories, setCategories] = useState<Category[]>(initialCategories)

	// Methods
	const formatCurrency = (amount: number): string => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: currency.sign,
		}).format(amount)
	}

	const addCategory = (category: Category): void => {
		setCategories([...categories, category])
	}

	const handleSetCurrency = (currency: Currency): void => {
		setCurrency(currency)
	}

	// Values
	const contextValue: ISettingsContext = {
		currency,
		availableCurrencies,
		categories,
		formatCurrency,
		addCategory,
		setCurrency: handleSetCurrency,
	}

	return (
		<SettingsContext.Provider value={contextValue}>
			{children}
		</SettingsContext.Provider>
	)
}

export default SettingsContextProvider
