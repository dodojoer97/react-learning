import type { FC } from "react";

// Props
import { InputProps } from "./Input.d";

// UI Components
import InputError from "./InputError";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input: FC<InputProps> = ({
	type,
	label,
	id,
	hiddenLabel,
	inputIcon,
	onClickIcon,
	required,
	errorMessage,
	...props
}) => {
	return (
		<div>
			<div>
				<label
					htmlFor={id}
					className={`${
						hiddenLabel ? "opacity-0" : undefined
					} block text-sm font-medium mb-1`}
				>
					{label} {required && <span className="text-red-500">*</span>}
				</label>

				{!inputIcon && (
					<input
						type={type}
						id={id}
						name={id}
						{...props}
						required={required}
						className="form-input w-full"
					/>
				)}

				{inputIcon && (
					<div className="relative">
						<input
							type={type}
							id={id}
							name={id}
							{...props}
							required={required}
							className="form-input w-full"
						/>
						<div className="absolute inset-0 left-auto flex items-center pr-4">
							<FontAwesomeIcon
								className="cursor-pointer"
								icon={inputIcon}
								onClick={() => onClickIcon?.()}
							/>
						</div>
					</div>
				)}
			</div>
			{errorMessage && <InputError message={errorMessage} />}
		</div>
	);
};

export default Input;
