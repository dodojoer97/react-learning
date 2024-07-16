import { useState } from "react";
import type { ChangeEvent } from "react";

/**
 * Custom hook for handling input events, and validation.
 *
 * @param defaultValue The default value of the input.
 * @param validationFn The validation function to fire, should return `true` if valid.
 * @param clearErrorFN The error cleaning function to fire
 * @returns Object containing input value, handlers for change and blur, and error state.
 */
const useInput = (
	defaultValue: string,
	validationFn: (value: string) => boolean, // More explicit type
	clearErrorFN?: () => void
): {
	value: string;
	handleInputChange(e: ChangeEvent<HTMLInputElement>): void;
	handleInputBlur(): void;
	hasError: boolean;
	isTouched: boolean;
} => {
	const [value, setValue] = useState<string>(defaultValue);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const valueIsValid: boolean = validationFn(value);

	function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
		setValue(e.target.value);
		setIsTouched(true);
		clearErrorFN && clearErrorFN()
	}

	function handleInputBlur(): void {
		setIsTouched(true);
	}

	return {
		value,
		handleInputChange,
		handleInputBlur,
		hasError: isTouched && !valueIsValid,
		isTouched,
	};
};

export default useInput;
