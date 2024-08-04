import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";

/**
 * Custom hook for handling input events, and validation.
 *
 * @param defaultValue The default value of the input.
 * @param validationFn The validation function to fire, should return `true` if valid.
 * @param clearErrorFN The error cleaning function to fire
 * @returns Object containing input value, handlers for change and blur, and error state, function to reset the input.
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
	resetInputValue(): void;
} => {
	const [value, setValue] = useState<string>(defaultValue);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const originalValue = useRef<string>(defaultValue);

	const valueIsValid: boolean = validationFn(value);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
		setValue(e.target.value);
		setIsTouched(true);
		clearErrorFN && clearErrorFN();
	};

	const handleInputBlur = (): void => {
		setIsTouched(true);
	};

	const resetInputValue = (): void => {
		setValue(originalValue.current);
	};

	// useEffect(() => {
	// 	return () => {
	// 		// Any cleanup logic here
	// 		resetInputValue(); // Call this function if you need to reset state when unmounting
	// 	};
	// }, []);

	return {
		value,
		handleInputChange,
		handleInputBlur,
		hasError: isTouched && !valueIsValid,
		isTouched,
		resetInputValue,
	};
};

export default useInput;
