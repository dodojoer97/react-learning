/**
 * Checks if the provided string contains an '@' character, commonly used to validate email addresses.
 *
 * @param {string} value - The string to be checked.
 * @returns {boolean} Returns true if the string includes an '@', indicating it could be an email address.
 */
export const isEmail = (value: string): boolean => {
	return value.includes("@");
};

/**
 * Determines if the provided string meets a minimum length requirement.
 *
 * @param {string} value - The string to check the length of.
 * @param {number} minLength - The minimum number of characters required.
 * @returns {boolean} Returns true if the string's length is greater than or equal to the minLength.
 */
export const hasMinLength = (value: string, minLength: number): boolean => {
	return value.length >= minLength;
};

/**
 * Converts a value to a Promise that resolves or rejects after a specified time.
 * This function is useful for simulating asynchronous operations in testing or development.
 *
 * @param {T} value - The value to be resolved with the promise.
 * @param {number} resolveTime - The time in milliseconds after which the promise will resolve or reject.
 * @param {boolean} shouldReject - Optional. If true, the promise will reject instead of resolve. Defaults to false.
 * @returns {Promise<T>} A promise that either resolves with the given value or rejects with an error.
 */
export const promisify = <T>(
	value: T,
	resolveTime: number,
	shouldReject: boolean = false
): Promise<T> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldReject) {
				reject(new Error("Promise rejected as requested."));
			} else {
				resolve(value);
			}
		}, resolveTime);
	});
};

/**
 * Checks if two values are equal.
 *
 * @template T - The type of the values to compare.
 * @param {T} value1 - The first value to compare.
 * @param {T} value2 - The second value to compare.
 * @returns {boolean} - Returns true if the values are equal, otherwise false.
 */
export const checkValuesEqual = <T>(value1: T, value2: T): boolean => {
	return value1 === value2;
};

/**
 * Retrieves the currency sign for a given currency code.
 *
 * This function uses `Intl.NumberFormat` to format a number according to the specified currency
 * and extracts the currency sign from the formatted parts.
 *
 * @param {string} currency - The currency code (e.g., "USD", "ILS").
 * @returns {string} - The currency sign associated with the given currency code.
 */

export const getCurrencySign = (currency: string): string => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
	});
	const parts = formatter.formatToParts(1.0);
	const currencySign = parts.find((part) => part.type === "currency")?.value || "";
	return currencySign;
};

/**
 * Debounces a function by delaying its execution until after a specified delay in milliseconds has passed since the last time it was invoked.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The number of milliseconds to delay the function call.
 * @returns {Function} - Returns a new debounced version of the original function.
 */
export const debounce = <F extends (...args: any[]) => any>(
	func: F,
	delay: number
): ((...args: Parameters<F>) => void) => {
	let timeoutId: NodeJS.Timeout | null = null;

	return (...args: Parameters<F>) => {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => func(...args), delay);
	};
};
