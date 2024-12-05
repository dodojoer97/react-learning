import React, { FC, useMemo, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store/store";
import { selectCategories } from "@/store/categorySlice";
import { selectTransactions } from "@/store/transactionSlice";
import { getMappedTransactions } from "@/store/transactionSlice";
import Card from "@/components/UI/Card";
import DoughnutChart from "@/components/UI/charts/DoughnutChart";
import Placeholder from "../UI/PlaceHolder";
import { ChartData } from "chart.js";
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

// Utility function
const generateRandomColor = (): string => {
	const letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
};

const mapTransactionsToChartData = (
	transactionsWithCategory: TransactionWithCategory[]
): ChartData => {
	const categoryMap: { [key: string]: number } = {};
	let totalAmount = 0;

	transactionsWithCategory.forEach(({ transaction, category }) => {
		const categoryName = category?.name || "Uncategorized";
		categoryMap[categoryName] = (categoryMap[categoryName] || 0) + transaction.amount;
		totalAmount += transaction.amount;
	});

	const labels = Object.keys(categoryMap);
	const data = Object.values(categoryMap).map(
		(amount) => Math.round((amount / totalAmount) * 1000) / 10
	);

	return {
		labels: labels.map((label, idx) => `${label} (${data[idx]}%)`),
		datasets: [
			{
				data,
				backgroundColor: labels.map(() => generateRandomColor()),
				hoverBackgroundColor: labels.map(() => generateRandomColor()),
			},
		],
	};
};

const TransactionDoughnut: FC = memo(() => {
	console.log("TransactionDoughnut");
	const { t } = useTranslation();
	const transactions = useSelector(selectTransactions);
	const categories = useSelector(selectCategories);
	const loading = useSelector((state: RootState) => state.categories.loading);

	console.log("transactions.length: ", transactions.length);
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
			{loading && (
				<div className="flex items-center flex-col justify-between">
					<Placeholder shape="circle" size="xl" />
					<div className="flex w-60 mt-3 justify-center gap-1">
						<Placeholder shape="pill" additionalSizeClasses="w-20 h-8" />
						<Placeholder shape="pill" additionalSizeClasses="w-20 h-8" />
					</div>
				</div>
			)}

			{!loading && chartData && <DoughnutChart data={chartData} width={389} height={260} />}
		</Card>
	);
});

export default TransactionDoughnut;
