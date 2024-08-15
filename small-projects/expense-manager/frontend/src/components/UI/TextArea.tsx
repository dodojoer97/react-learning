import type { FC } from "react";

// Props
import { TextAreaProps } from "./Input.d";

const TextArea: FC<TextAreaProps> = ({ label, id, hiddenLabel, placeholder, ...props }) => {
	return (
		<>
			<div>
				<label htmlFor={id} className={hiddenLabel ? "opacity-0" : undefined}>
					{label}
				</label>

				<div className="relative">
					<textarea
						name={id}
						id={id}
						{...props}
						rows={4}
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder={placeholder}
					></textarea>
				</div>
			</div>
		</>
	);
};

export default TextArea;
