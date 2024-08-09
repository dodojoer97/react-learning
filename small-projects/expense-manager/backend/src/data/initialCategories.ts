// Model
import { Category } from "@common";

// UUID
import { v4 } from "uuid";

const initialCategories: Category[] = [
	// Expense
	new Category("faBowlFood", "Food", v4(), "expense"),
	new Category("faBus", "Transport", v4(), "expense"),
	new Category("faHouse", "Rent", v4(), "expense"),
	// Income
	new Category("faCoins", "Income", v4(), "income"),
	// new Category("faHouse", "Rent", v4(), "expense"),
	// new Category("faHouse", "Rent", v4(), "expense"),
];

export default initialCategories;
