import { FC } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from "recharts";

// Types
import { TransactionWithCategory } from "@/mappers/TransactionCategoryAssigner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
	cx: number;
	cy: number;
	midAngle: number;
	innerRadius: number;
	outerRadius: number;
	percent: number;
	index: number;
}

const renderCustomizedLabel = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	percent,
	index,
}: CustomizedLabelProps) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text
			x={x}
			y={y}
			fill="white"
			textAnchor={x > cx ? "start" : "end"}
			dominantBaseline="central"
		>
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

interface DataItem {
	name: string;
	value: number;
}

interface Props {
	transactions: TransactionWithCategory[];
}

const TransactionPie: FC<Props> = ({ transactions }) => {
	// Function to map transactions to data items
	console.log("transactions: ");
	const mapTransactionsToDataItems = (transactions: TransactionWithCategory[]): DataItem[] => {
		return transactions.map(({ transaction, category }) => ({
			name: category?.name || "", // Replace this with category name if available
			value: transaction.amount,
		}));
	};

	const data = mapTransactionsToDataItems(transactions);

	return (
		<ResponsiveContainer>
			<PieChart width={400} height={400}>
				<Pie
					data={data}
					cx="50%"
					cy="50%"
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
				<Legend /> {/* This adds the legend to the chart */}
			</PieChart>
		</ResponsiveContainer>
	);
};

export default TransactionPie;
