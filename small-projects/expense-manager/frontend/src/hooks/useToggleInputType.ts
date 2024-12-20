import { useState } from "react";

/**
 * Custom hook for toggling an input field between 'password' and 'text' types.
 *
 * @param initialType The initial type of the input, defaulting to "password".
 * @returns An object containing the current input type and a function to toggle the type.
 */
const useToggleInputType = (
	inputType: "password" | "text" = "password"
): { type: "password" | "text"; toggleInputType(): void } => {
	const [type, setType] = useState<"password" | "text">(inputType);

	const toggleInputType = (): void => {
		setType((currentType: "password" | "text") =>
			currentType === "password" ? "text" : "password"
		);
	};

	return {
		type,
		toggleInputType,
	};
};

export default useToggleInputType;
