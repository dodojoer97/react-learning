// React
import { useState } from "react";
import type { FC } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

interface IProps {
	onChange(date: Date): void;
	onBlur(): void;
	date?: Date;
}

const DatePickerComp: FC<IProps> = ({ onChange, onBlur, date = new Date() }) => {
	const [startDate, setStartDate] = useState(date);

	const handleChange = (date: Date) => {
		setStartDate(date);
		onChange(date);
	};

	return (
		<DatePicker
			selected={startDate}
			onChange={(date) => date && handleChange(date)}
			onBlur={onBlur}
			dateFormat="dd-MM-yyyy"
		/>
	);
};

export default DatePickerComp;
