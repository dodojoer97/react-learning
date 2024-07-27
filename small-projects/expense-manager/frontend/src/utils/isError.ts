/**
 * Type guard for determining if a given value is an instance of Error.
 * This function checks if the provided value is an instance of the Error class.
 *
 * @param {unknown} error - The value to be checked.
 * @returns {boolean} Returns true if the value is an Error, false otherwise.
 */
export const isError = (error: unknown): error is Error => {
	return error instanceof Error;
};
