import { FC, useContext } from "react";

// Store
import { TransactionContext } from "@/store/TransactionContext";

// Import the DoughnutChart component
import DoughnutChart from "@/templates/mosaic/charts/DoughnutChart";
import Card from "@/components/UI/Card";

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

	// Calculate percentage for each category and round to 1 decimal place
	const labels = Object.keys(categoryMap);
	const data = Object.values(categoryMap).map((amount) => {
		const percentage = (amount / totalAmount) * 100;
		return Math.round(percentage * 10) / 10; // Round to 1 decimal place
	});

	// Add percentage sign to labels
	const labelsWithPercentages = labels.map((label, index) => `${label} (${data[index]}%)`);

	// Dynamically generate colors for each category
	const backgroundColors = labels.map(() => generateRandomColor());
	const hoverColors = labels.map(() => generateRandomColor());

	return {
		labels: labelsWithPercentages,
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

	const transactionsWithCategory = getMappedTransactions("expense");

	// Map transactions to chart data format
	const chartData = mapTransactionsToChartData(transactionsWithCategory);
	return (
		<Card title="Expense structure">
			{!!chartData.labels?.length && (
				<DoughnutChart data={chartData} width={389} height={260} />
			)}
		</Card>
	);
};

export default TransactionDoughnut;
