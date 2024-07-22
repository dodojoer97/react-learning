// Model
import Category from "@/models/Category"

import {v4} from "uuid"

import { faBowlFood, faBus, faHouse } from '@fortawesome/free-solid-svg-icons';


const initialCategories: Category[] = [
	new Category(faBowlFood, "Food", v4()),
	new Category(faBus, "Transport", v4()),
	new Category(faHouse, "Rent", v4()),
	// new Category("path/to/utilities_image.png", "Utilities", v4()),
	// new Category("path/to/entertainment_image.png", "Entertainment", v4()),
	// new Category("path/to/health_image.png", "Health", v4()),
	// new Category("path/to/education_image.png", "Education", v4()),
	// new Category("path/to/clothing_image.png", "Clothing", v4()),
	// new Category("path/to/insurance_image.png", "Insurance", v4()),
	// new Category("path/to/personal_care_image.png", "Personal Care", v4()),
	// new Category("path/to/travel_image.png", "Travel", v4()),
	// new Category("path/to/other_image.png", "Other", v4()),
]

export default initialCategories
