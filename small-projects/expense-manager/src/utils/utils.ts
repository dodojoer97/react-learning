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
export const checkValuesEqual = <T>(value1: T , value2: T): boolean => {
	return value1 === value2
}