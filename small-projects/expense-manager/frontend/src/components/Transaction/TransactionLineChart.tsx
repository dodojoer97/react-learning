import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions, getMappedTransactions } from "@/store/transactionSlice"; // Fetch transactions and mapped transactions
import { fetchCategories } from "@/store/settingsSlice"; // Fetch categories
import { RootState, AppDispatch } from "@/store/store"; // Store types

// Components
import LineChart from "@/templates/mosaic/charts/LineChart03";
import Card from "@/components/UI/Card"; // Import the new Card component

// Utility for chart configuration
import { chartAreaGradient } from "@/templates/mosaic/charts/ChartjsConfig";
import { tailwindConfig, hexToRGB } from "@/templates/mosaic/utils/Utils"; // Helper functions for Tailwind and color conversions
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

const TransactionLineChart: FC = () => {
	// Redux hooks
	const dispatch = useDispatch<AppDispatch>();
	const transactions = useSelector((state: RootState) => state.transaction.transactions);
	const selectedDates = useSelector((state: RootState) => state.transaction.selectedDates);
	const categories = useSelector((state: RootState) => state.settings.categories);
	const userId = useSelector((state: RootState) => state.auth.user?.uid); // Fetch the userId from the auth state

	// Fetch categories and transactions when the component mounts
	useEffect(() => {
		const handleFetch = async () => {
			if (!categories.length && userId) {
				await dispatch(fetchCategories(userId)); // Fetch categories based on userId
			}

			if (!transactions.length && userId) {
				await dispatch(fetchTransactions({ userId })); // Fetch transactions based on userId
			}
		};
		handleFetch();
	}, [dispatch, categories.length, userId]);

	// Memoized mapped transactions
	const mappedTransactions = useMemo(
		() => getMappedTransactions(transactions, categories),
		[transactions, categories]
	);

	// Helper function to generate date range between start and end date
	const getDatesInRange = (selectedDates: Date[] | null): string[] => {
		if (!selectedDates) return [];

		const [startDate, endDate] = selectedDates;

		const start = new Date(startDate);
		const end = new Date(endDate);
		const dates: string[] = [];

		for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
			dates.push(new Date(d).toISOString().split("T")[0]); // Format as YYYY-MM-DD
		}

		return dates;
	};

	// Helper function to aggregate transaction amounts by date
	const aggregateTransactionsByDate = (
		transactions: TransactionWithCategory[]
	): { [key: string]: number } => {
		return transactions.reduce((acc, { transaction }) => {
			const date = new Date(transaction.date).toISOString().split("T")[0]; // Format as YYYY-MM-DD
			if (!acc[date]) {
				acc[date] = 0;
			}
			acc[date] += transaction.amount;
			return acc;
		}, {} as { [key: string]: number });
	};

	// Generate date range and aggregate transaction data

	const dateRange = useMemo(() => getDatesInRange(selectedDates), [selectedDates]);
	const aggregatedData = useMemo(
		() => aggregateTransactionsByDate(mappedTransactions),
		[mappedTransactions]
	);

	// Map the aggregated data to the date range for the chart
	const chartData = dateRange.map((date) => aggregatedData[date] || 0);

	// Chart.js data structure
	const chartConfig = useMemo(
		() => ({
			labels: dateRange,
			datasets: [
				{
					label: "Transactions",
					data: chartData,
					fill: true,
					backgroundColor: (context: any) => {
						const chart = context.chart;
						const { ctx, chartArea } = chart;
						return chartAreaGradient(ctx, chartArea, [
							{
								stop: 0,
								color: `rgba(${hexToRGB(
									tailwindConfig().theme.colors.violet[500]
								)}, 0)`,
							},
							{
								stop: 1,
								color: `rgba(${hexToRGB(
									tailwindConfig().theme.colors.violet[500]
								)}, 0.2)`,
							},
						]);
					},
					borderColor: tailwindConfig().theme.colors.violet[500],
					borderWidth: 2,
					pointRadius: 0,
					pointHoverRadius: 3,
					pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
					pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
					pointBorderWidth: 0,
					pointHoverBorderWidth: 0,
					clip: 20,
					tension: 0.2,
				},
			],
		}),
		[dateRange, chartData]
	);

	return (
		<Card title="Transaction Overview">
			<LineChart data={chartConfig} width={800} height={300} />
		</Card>
	);
};

export default TransactionLineChart;
