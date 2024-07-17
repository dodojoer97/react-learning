// React
import type { FC } from "react"

// Props
import { SelectInputProps } from "./Input.d"

const Select: FC<SelectInputProps<string>> = ({
	label,
	id,
	hiddenLabel,
	options,
	...props
}) => {
	return (
		<>
			<label
				htmlFor={id}
				className={hiddenLabel ? "absolute" : undefined}>
				{label}
			</label>
			<select
				name={id}
				id={id}
				{...props}>
				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</>
	)
}

export default Select
