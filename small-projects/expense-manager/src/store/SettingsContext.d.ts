import type {Category} from "@/models/Category"

export interface ISettingsContext {
    currency: string,
    availableCurrencies: string[],
    categories: Category[]
    addCategory: (category: Category) => void
    formatCurrency: (amount: number) => string;
}