import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";

/**
 * Custom hook for handling input events, and validation.
 *
 * @param defaultValue The default value of the input.
 * @param validationFn The validation function to fire, should return `true` if valid.
 * @param clearErrorFN The error cleaning function to fire
 * @param changeFn The function to fire when the value changes
 * @returns Object containing input value, handlers for change and blur, and error state, function to reset the input.
 */
const useInput = <
	T extends HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement,
	V = string | number | Date
>({
	defaultValue,
	validationFn,
	clearErrorFN,
	changeFn,
}: {
	defaultValue: V;
	validationFn?: (value: V) => boolean;
	clearErrorFN?: () => void;
	changeFn?: (value: V) => void;
}): {
	value: V;
	handleInputChange(e: ChangeEvent<T> | Date): void;
	handleInputBlur(): void;
	hasError: boolean;
	isTouched: boolean;
} => {
	const [value, setValue] = useState<V>(defaultValue);
	const [isTouched, setIsTouched] = useState<boolean>(false);

	const valueIsValid: boolean = validationFn ? validationFn(value) : true;

	const handleInputChange = (e: ChangeEvent<T> | Date): void => {
		let inputValue: V;

		if (e instanceof Date) {
			changeFn && changeFn(e as V);
			return;
		}

		if (e.target.type === "number") {
			// Parse to number if the input type is number
			inputValue = (e.target.value === "" ? 0 : parseFloat(e.target.value)) as V;
		} else {
			inputValue = e.target.value as unknown as V;
		}

		setValue(inputValue);
		setIsTouched(true);
		changeFn && changeFn(inputValue);
		clearErrorFN && clearErrorFN();
	};

	const handleInputBlur = (): void => {
		setIsTouched(true);
	};

	return {
		value,
		handleInputChange,
		handleInputBlur,
		hasError: isTouched && !valueIsValid,
		isTouched,
	};
};

export default useInput;
