// Model
import { Category } from "../models/Category";

// UUID
import { v4 } from "uuid";

const initialCategories: Category[] = [
	new Category("faBowlFood", "Food", v4()),
	new Category("faBus", "Transport", v4()),
	new Category("faHouse", "Rent", v4()),
];

export default initialCategories;
