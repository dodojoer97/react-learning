import type { Category } from "@/models/Category"

export interface ISettingsContext {
	currency: Currency
	availableCurrencies: Currency[]
	categories: Category[]
	addCategory: (category: Category) => void
	formatCurrency: (amount: number) => string
}
