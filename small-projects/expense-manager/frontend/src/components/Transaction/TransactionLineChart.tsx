import type { FC } from "react";
import { useMemo } from "react";

// i18n
import { useTranslation } from "react-i18next";

// Redux
import { useSelector } from "react-redux";
import { getMappedTransactions } from "@/store/transactionSlice"; // Fetch transactions and mapped transactions
import { RootState } from "@/store/store"; // Store types

// Components
import LineChart from "@/templates/mosaic/charts/LineChart03";
import Card from "@/components/UI/Card"; // Import the new Card component
import Loader from "@/components/UI/Loader";

// Utility for chart configuration
import { chartAreaGradient } from "@/templates/mosaic/charts/ChartjsConfig";
import { tailwindConfig, hexToRGB } from "@/templates/mosaic/utils/Utils"; // Helper functions for Tailwind and color conversions
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";
import moment from "moment";
import useLoading from "@/hooks/useLoading";

const TransactionLineChart: FC = () => {
	// i18n
	const { t } = useTranslation();
	// Redux hooks
	const transactions = useSelector((state: RootState) => state.transaction.transactions);
	const selectedDates = useSelector((state: RootState) => state.transaction.selectedDates);
	const categories = useSelector((state: RootState) => state.categories.categories);

	// computed
	const isLoadingAny: boolean = useLoading();

	// Memoized mapped transactions
	const mappedTransactions = useMemo(
		() => getMappedTransactions(transactions, categories, "expense"),
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

	return (
		<Card title={t("transactions:overview")} className="relative">
			{isLoadingAny && (
				<Loader className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
			)}

			<LineChart data={chartConfig} width={800} height={300} />
		</Card>
	);
};

export default TransactionLineChart;
