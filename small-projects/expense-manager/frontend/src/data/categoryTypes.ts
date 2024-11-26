import SelectFieldOption from "@/models/SelectFieldOption";

const categoryTypes: SelectFieldOption<string>[] = [
	{ value: "expense", label: "expense" },
	{ value: "income", label: "income" },
];

export default categoryTypes;
