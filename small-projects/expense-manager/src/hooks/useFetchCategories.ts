//
import { useContext, useEffect } from "react"

// Store
import { AuthContext } from "@/store/AuthContext"
import { SettingsContext } from "@/store/SettingsContext"

// Service
import SettingsService from "@/services/SettingsService"

// Models
import Category from "@/models/Category"

const useFetchCategories = () => {
	const { user } = useContext(AuthContext)
	const { setCategories } = useContext(SettingsContext)
	const settingsService = new SettingsService()

	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			if (user?.id) {
				try {
					const fetchedCategories: Category[] =
						await settingsService.getCategories(user.id)
					setCategories((currentCategories: Category[]) => {
						const updatedCategories = [
							...currentCategories,
							...fetchedCategories,
						]
						return updatedCategories
					})
				} catch (error) {
					console.error("Failed to fetch categories:", error)
				}
			}
		}

		fetchCategories()
	}, [user, setCategories])
}

export default useFetchCategories
