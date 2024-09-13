import { FC, useContext } from "react";

// Store
import { TransactionContext } from "@/store/TransactionContext";

// Import the DoughnutChart component
import DoughnutChart from "@/templates/mosaic/charts/DoughnutChart";

// Import utilities

// Chart.js Data type
import { ChartData } from "chart.js";

// Mappers
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

/**
 * Function to generate random colors
 */
const generateRandomColor = (): string => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

/**
 * Function to map transactions to chart data based on categories with percentages and random colors
 */
const mapTransactionsToChartData = (
	transactionsWithCategory: TransactionWithCategory[]
): ChartData => {
	const categoryMap: { [key: string]: number } = {};

	// Aggregate transaction amounts by category
	let totalAmount = 0;
	transactionsWithCategory.forEach(({ transaction, category }) => {
		const categoryName = category?.name || "Uncategorized";
		if (categoryMap[categoryName]) {
			categoryMap[categoryName] += transaction.amount;
		} else {
			categoryMap[categoryName] = transaction.amount;
		}
		totalAmount += transaction.amount; // Track the total amount across all categories
	});

	// Calculate percentage for each category
	const labels = Object.keys(categoryMap);
	const data = Object.values(categoryMap).map((amount) => (amount / totalAmount) * 100);

	// Dynamically generate colors for each category
	const backgroundColors = labels.map(() => generateRandomColor());
	const hoverColors = labels.map(() => generateRandomColor());

	return {
		labels,
		datasets: [
			{
				label: "Transaction Percentages",
				data: data,
				backgroundColor: backgroundColors,
				hoverBackgroundColor: hoverColors,
				borderWidth: 0,
			},
		],
	};
};

const TransactionDoughnut: FC = () => {
	// Get transactions and categories from the context
	const { getMappedTransactions } = useContext(TransactionContext);

	const transactionsWithCategory = getMappedTransactions();

	// Map transactions to chart data format
	const chartData = mapTransactionsToChartData(transactionsWithCategory);

	return (
		<div className="flex flex-col bg-white dark:bg-gray-800 shadow-sm rounded-xl">
			<header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">
					Transactions by Category
				</h2>
			</header>
			<DoughnutChart data={chartData} width={389} height={260} />
		</div>
	);
};

export default TransactionDoughnut;
