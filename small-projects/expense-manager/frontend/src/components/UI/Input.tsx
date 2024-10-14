import type { FC } from "react";

// Props
import { InputProps } from "./Input.d";

const Input: FC<InputProps> = ({
	type,
	label,
	id,
	hiddenLabel,
	inputIcon,
	clickableIcon,
	onClickIcon,
	...props
}) => {
	return (
		<div>
			<label
				htmlFor={id}
				className={`${
					hiddenLabel ? "opacity-0" : undefined
				} block text-sm font-medium mb-1`}
			>
				{label}
			</label>

			<input type={type} id={id} name={id} {...props} className="form-input w-full" />
		</div>
	);
};

export default Input;
