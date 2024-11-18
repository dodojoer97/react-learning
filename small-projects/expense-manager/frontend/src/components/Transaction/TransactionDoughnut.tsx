import { FC, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

// Translations
import { useTranslation } from "react-i18next";

// Store
import { RootState } from "@/store/store"; // Import the store types
import { getMappedTransactions } from "@/store/transactionSlice"; // Redux function to map transactions

// Import the DoughnutChart component
import DoughnutChart from "@/templates/mosaic/charts/DoughnutChart";
import Card from "@/components/UI/Card";

// Chart.js Data type
import { ChartData } from "chart.js";

// Mappers
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";
import Placeholder from "../UI/PlaceHolder";

// Hooks
import useLoading from "@/hooks/useLoading";

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
	// Translations
	const { t } = useTranslation();
	// Get transactions and categories from the Redux store
	const transactions = useSelector((state: RootState) => state.transaction.transactions);
	const categories = useSelector((state: RootState) => state.categories.categories);

	// Hooks
	const loadingAny: boolean = useLoading();

	// Memoized chart data based on transactions and categories
	const chartData = useMemo(() => {
		if (!transactions.length || !categories.length) return null;
		const transactionsWithCategory = getMappedTransactions(
			transactions,
			categories,
			"expense",
			"completed"
		);
		return mapTransactionsToChartData(transactionsWithCategory);
	}, [transactions, categories]);

	return (
		<Card title={t("transactions:expenseStructure")} className="min-h-[450px]">
			{loadingAny && (
				<>
					<div className="flex items-center flex-col justify-between">
						<Placeholder shape="circle" size="xl" />
						<div className="flex w-60 mt-3 justify-center gap-1">
							<Placeholder shape="pill" additionalSizeClasses="w-20 h-8" />
							<Placeholder shape="pill" additionalSizeClasses="w-20 h-8" />
						</div>
					</div>
				</>
			)}

			{!loadingAny && !!chartData && (
				<DoughnutChart data={chartData} width={389} height={260} />
			)}
		</Card>
	);
};

export default TransactionDoughnut;
