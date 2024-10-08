import React, { useRef, useEffect, useState } from "react";
import { useThemeProvider } from "../utils/ThemeContext";
import { chartColors } from "./ChartjsConfig";
import { Chart, PieController, ArcElement, TimeScale, Tooltip } from "chart.js";
import "chartjs-adapter-moment";

// Import utilities
import { tailwindConfig } from "../utils/Utils";

// Register Chart.js components
Chart.register(PieController, ArcElement, TimeScale, Tooltip);

interface PieChartProps {
	data: Chart.ChartData;
	width: number;
	height: number;
}

interface LegendItem {
	text: string;
	fillStyle: string;
	hidden: boolean;
}

const PieChart: React.FC<PieChartProps> = ({ data, width, height }) => {
	const chartInstance = useRef<Chart | null>(null);
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const { currentTheme } = useThemeProvider();
	const darkMode = currentTheme === "dark";
	const { tooltipTitleColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

	const [legendItems, setLegendItems] = useState<LegendItem[]>(
		data.labels?.map((label, index) => ({
			text: label as string,
			fillStyle: data.datasets[0].backgroundColor[index] as string,
			hidden: false,
		})) || []
	);

	useEffect(() => {
		if (!canvas.current) return;
		const ctx = canvas.current.getContext("2d");

		// Destroy the chart if it already exists
		if (chartInstance.current) {
			chartInstance.current.destroy();
		}

		// Create a new chart instance
		chartInstance.current = new Chart(ctx as CanvasRenderingContext2D, {
			type: "pie",
			data,
			options: {
				layout: {
					padding: {
						top: 4,
						bottom: 4,
						left: 24,
						right: 24,
					},
				},
				plugins: {
					legend: {
						display: false, // Manual legend handling
					},
					tooltip: {
						titleColor: darkMode ? tooltipTitleColor.dark : tooltipTitleColor.light,
						bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
						backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
						borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
					},
				},
				interaction: {
					intersect: false,
					mode: "nearest",
				},
				animation: {
					duration: 200,
				},
				maintainAspectRatio: false,
			},
		});

		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [data, darkMode]);

	const toggleVisibility = (index: number) => {
		if (chartInstance.current) {
			chartInstance.current.toggleDataVisibility(index);
			chartInstance.current.update();
			setLegendItems((prevItems) =>
				prevItems.map((item, idx) =>
					idx === index ? { ...item, hidden: !item.hidden } : item
				)
			);
		}
	};

	return (
		<div className="grow flex flex-col justify-center">
			<div>
				<canvas ref={canvas} width={width} height={height}></canvas>
			</div>
			<div className="px-5 py-4">
				<ul className="flex flex-wrap justify-center -m-1">
					{legendItems.map((item, idx) => (
						<li key={idx} style={{ margin: tailwindConfig().theme.margin[1.5] }}>
							<button
								className="btn-xs bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 shadow-sm shadow-black/[0.08] rounded-full"
								style={{ opacity: item.hidden ? ".3" : "1" }}
								onClick={() => toggleVisibility(idx)}
							>
								<span
									style={{
										display: "block",
										width: tailwindConfig().theme.width[3],
										height: tailwindConfig().theme.height[3],
										backgroundColor: item.fillStyle,
										borderRadius: tailwindConfig().theme.borderRadius.full,
										marginRight: tailwindConfig().theme.margin[1.5],
									}}
								></span>
								{item.text}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default PieChart;
