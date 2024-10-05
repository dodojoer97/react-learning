import React from "react";
import Flatpickr from "react-flatpickr";
import { BaseOptions } from "flatpickr/dist/types/options";

import { getFirstDayOfMonth } from "@/utils/utils";

interface DatepickerProps {
	align?: string;
	onChange?: (selectedDates: Date[], dateStr: string) => void;
	mode?: BaseOptions["mode"]; // Using the mode type from BaseOptions
	defaultDate?: BaseOptions["defaultDate"];
}

const Datepicker: React.FC<DatepickerProps> = ({
	align,
	onChange,
	mode = "range",
	defaultDate,
}) => {
	const options: BaseOptions = {
		mode,
		static: true,
		disableMobile: true,
		monthSelectorType: "static",
		dateFormat: "M j, Y",
		defaultDate: new Date(defaultDate) || [getFirstDayOfMonth(), new Date()], // Set the default date to the start of the month and today
		prevArrow:
			'<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
		nextArrow:
			'<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
		onChange: (selectedDates: Date[], dateStr: string, instance: any) => {
			instance.element.value = dateStr.replace("to", "-");
			if (onChange) {
				onChange(selectedDates, dateStr);
			}
		},
		onReady: (selectedDates: Date[], dateStr: string, instance: any) => {
			instance.element.value = dateStr.replace("to", "-");
			const customClass = align ? align : "";
			instance.calendarContainer.classList.add(`flatpickr-${customClass}`);
		},
	};

	return (
		<div className="relative">
			<Flatpickr
				className="form-input pl-9 dark:bg-gray-800 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 font-medium w-[15.5rem]"
				options={options}
			/>
			<div className="absolute inset-0 right-auto flex items-center pointer-events-none">
				<svg
					className="fill-current text-gray-400 dark:text-gray-500 ml-3"
					width="16"
					height="16"
					viewBox="0 0 16 16"
				>
					<path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
					<path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
				</svg>
			</div>
		</div>
	);
};

export default Datepicker;
