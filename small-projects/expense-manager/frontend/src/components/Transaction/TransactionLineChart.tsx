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
import AnalyticsCard01 from "@/templates/mosaic/partials/analytics/AnalyticsCard01";
import moment from "moment";

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

	const getDatesInRange = (selectedDates: string[] | null): string[] => {
		if (!selectedDates) return [];

		const start = moment(selectedDates[0]);
		const end = moment(selectedDates[1]);
		const dates: string[] = [];

		for (let date = moment(start); date.isSameOrBefore(end); date.add(1, "days")) {
			dates.push(date.format("MM-DD-YYYY"));
		}

		return dates;
	};

	// Helper function to aggregate transaction amounts by date
	const aggregateTransactionsByDate = (
		transactions: TransactionWithCategory[]
	): { [key: string]: number } => {
		const aggregation: { [key: string]: number } = {};

		for (const { transaction } of transactions) {
			const formattedDate = moment(transaction.date).format("MM-DD-YYYY");

			if (!aggregation[formattedDate]) {
				aggregation[formattedDate] = transaction.amount; // Initialize if not present
			} else {
				aggregation[formattedDate] += transaction.amount; // Aggregate if already present
			}
		}

		return aggregation;
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

	console.log("chartConfig: ", chartConfig);
	return (
		<Card title="Transaction Overview">
			{/* <AnalyticsCard01 /> */}
			<LineChart data={chartConfig} width={800} height={300} />
		</Card>
	);
};

export default TransactionLineChart;
