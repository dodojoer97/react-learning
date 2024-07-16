// React
import type {FC, PropsWithChildren, Context} from "react"
import { createContext } from "react"


// Interface
import {ISettingsContext} from "./SettingsContext.d"

// Models
import Category from "@/models/Category"

export const SettingsContext: Context<ISettingsContext> = createContext<ISettingsContext>({
    currency: "ILS",
    availableCurrencies: ["ILS", "USD"],
    categories: [],
    formatCurrency: (amount: number) => "",
    addCategory: (category: Category)  => {},
})


const SettingsContextProvider: FC<PropsWithChildren> = ({children}) => {

    
    
    return <SettingsContext.Provider>{children}</SettingsContext.Provider>
}

export default SettingsContextProvider