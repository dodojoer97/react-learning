import type { FC } from "react";

// Props
import { SelectInputProps } from "./Input.d";

const Select: FC<SelectInputProps<string>> = ({ label, id, hiddenLabel, options, ...props }) => {
	return (
		<>
			<div>
				<label htmlFor={id} className={hiddenLabel ? "opacity-0" : undefined}>
					{label}
				</label>

				<div className="relative">
					<select
						name={id}
						id={id}
						{...props}
						className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus-visible:outline-black"
					>
						{options.map((option) => (
							<option key={option.value} value={option.value}>
								{option.text}
							</option>
						))}
					</select>
				</div>
			</div>
		</>
	);
};

export default Select;
