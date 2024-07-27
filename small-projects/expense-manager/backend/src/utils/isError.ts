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

interface FirebaseError extends Error {
	code: string;
}

/**
 * Type guard for determining if a given value is an instance of FirebaseError.
 * This function checks if the provided value is an object with a `code` property.
 *
 * @param {unknown} error - The value to be checked.
 * @returns {boolean} Returns true if the value is a FirebaseError, false otherwise.
 */
export const isFirebaseError = (error: unknown): error is FirebaseError => {
	return typeof error === "object" && error !== null && "code" in error;
};
