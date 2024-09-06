import React, { useState, useEffect } from "react";
import Invoices from "./InvoicesTableItem";

interface Invoice {
	id: string;
	invoice: string;
	total: string;
	status: "Paid" | "Due" | "Overdue" | string;
	customer: string;
	issueddate: string;
	paiddate: string;
	type: "Subscription" | "One-time" | string;
}

interface InvoicesTableProps {
	selectedItems: (items: string[]) => void;
}

const InvoicesTable: React.FC<InvoicesTableProps> = ({ selectedItems }) => {
	const invoices: Invoice[] = [
		{
			id: "0",
			invoice: "#123567",
			total: "$129.00",
			status: "Overdue",
			customer: "Dominik Lamakani",
			issueddate: "22/07/2024",
			paiddate: "-",
			type: "Subscription",
		},
		{
			id: "1",
			invoice: "#779912",
			total: "$59.00",
			status: "Paid",
			customer: "Mark Cameron",
			issueddate: "19/07/2024",
			paiddate: "20/07/2024",
			type: "Subscription",
		},
		{
			id: "2",
			invoice: "#889924",
			total: "$89.00",
			status: "Paid",
			customer: "Sergio Gonnelli",
			issueddate: "17/07/2024",
			paiddate: "19/07/2024",
			type: "One-time",
		},
		{
			id: "3",
			invoice: "#897726",
			total: "$129.00",
			status: "Due",
			customer: "Manuel Garbaya",
			issueddate: "04/07/2024",
			paiddate: "-",
			type: "Subscription",
		},
		{
			id: "4",
			invoice: "#123567",
			total: "$129.00",
			status: "Due",
			customer: "Cool Robot",
			issueddate: "04/07/2024",
			paiddate: "-",
			type: "Subscription",
		},
		{
			id: "5",
			invoice: "#896644",
			total: "$129.00",
			status: "Paid",
			customer: "Mark Cameron",
			issueddate: "04/07/2024",
			paiddate: "09/07/2024",
			type: "One-time",
		},
		{
			id: "6",
			invoice: "#136988",
			total: "$69.00",
			status: "Paid",
			customer: "Glenn Thomas",
			issueddate: "01/07/2024",
			paiddate: "01/07/2024",
			type: "One-time",
		},
		{
			id: "7",
			invoice: "#442206",
			total: "$129.00",
			status: "Overdue",
			customer: "Dominik Lamakani",
			issueddate: "22/06/2024",
			paiddate: "-",
			type: "Subscription",
		},
		{
			id: "8",
			invoice: "#764321",
			total: "$89.00",
			status: "Paid",
			customer: "Brian Halligan",
			issueddate: "21/06/2024",
			paiddate: "29/06/2024",
			type: "One-time",
		},
		{
			id: "9",
			invoice: "#908764",
			total: "$129.00",
			status: "Due",
			customer: "Carolyn McNeail",
			issueddate: "17/06/2024",
			paiddate: "-",
			type: "Subscription",
		},
	];

	const [selectAll, setSelectAll] = useState(false);
	const [isCheck, setIsCheck] = useState<string[]>([]);
	const [list, setList] = useState<Invoice[]>([]);

	useEffect(() => {
		setList(invoices);
	}, []);

	const handleSelectAll = () => {
		setSelectAll(!selectAll);
		setIsCheck(selectAll ? [] : list.map((li) => li.id));
	};

	const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = e.target;
		setSelectAll(false);
		if (checked) {
			setIsCheck([...isCheck, id]);
		} else {
			setIsCheck(isCheck.filter((item) => item !== id));
		}
	};

	useEffect(() => {
		selectedItems(isCheck);
	}, [isCheck, selectedItems]);

	return (
		<div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
			<header className="px-5 py-4">
				<h2 className="font-semibold text-gray-800 dark:text-gray-100">
					Invoices{" "}
					<span className="text-gray-400 dark:text-gray-500 font-medium">67</span>
				</h2>
			</header>
			<div>
				{/* Table */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full dark:text-gray-300">
						{/* Table header */}
						<thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
							<tr>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
									<div className="flex items-center">
										<label className="inline-flex">
											<span className="sr-only">Select all</span>
											<input
												className="form-checkbox"
												type="checkbox"
												checked={selectAll}
												onChange={handleSelectAll}
											/>
										</label>
									</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Invoice</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Total</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Status</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Customer</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Issued on</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Paid on</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Type</div>
								</th>
								<th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
									<div className="font-semibold text-left">Actions</div>
								</th>
							</tr>
						</thead>
						{/* Table body */}
						<tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
							{list.map((invoice) => {
								return (
									<Invoices
										key={invoice.id}
										id={invoice.id}
										invoice={invoice.invoice}
										total={invoice.total}
										status={invoice.status}
										customer={invoice.customer}
										issueddate={invoice.issueddate}
										paiddate={invoice.paiddate}
										type={invoice.type}
										handleClick={handleClick}
										isChecked={isCheck.includes(invoice.id)}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default InvoicesTable;
