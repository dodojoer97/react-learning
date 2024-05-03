import { calculateInvestmentResults, formatter } from "../util/investment";

export default function Results({ userInput }) {
	const resultsData = calculateInvestmentResults(userInput);
	return (
		<table id="result">
			<thead>
				<tr>
					<th>Year</th>
					<th>Investement Value</th>
					<th>Interest (Year)</th>
					<th>Total Interest</th>
					<th>Invested Capital</th>
				</tr>
			</thead>
			<tbody>
				{resultsData.map((yearData) => {
					return (
						<tr key={yearData.year}>
							<td>{yearData.year}</td>
							<td>{formatter.format(yearData.valueEndOfYear)}</td>
							<td>{formatter.format(yearData.interest)}</td>
							<td>{yearData.annualInvestment}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
