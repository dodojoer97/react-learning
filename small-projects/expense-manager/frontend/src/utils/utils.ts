// Types
import { IGroupItem, IGroupedItem } from "./utils.d";

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
 * Determines if the provided number meets a minimum value requirement.
 *
 * @param {number} value - The string to check the length of.
 * @param {number} minValue - The minimum number of characters required.
 * @returns {boolean} Returns true if the string's length is greater than or equal to the minValue.
 */
export const hasMinValue = (value: number, minValue: number): boolean => {
	return value >= minValue;
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
 * Groups an array of items by their `type` property and returns an array of grouped items.
 * Each group is represented as an object containing the type and an array of items of that type.
 *
 * @template T - The item type extending the IGroupItem interface.
 * @param {T[]} data - Array of items to be grouped.
 * @returns {IGroupedItem<T>[]} An array of grouped items, each with a type and an array of items of that type.
 */
export const groupByType = <T extends IGroupItem>(data: T[]): IGroupedItem<T>[] => {
	const groups: Record<string, T[]> = {};

	// Grouping items by their type
	data.forEach((item) => {
		if (!groups[item.type]) {
			groups[item.type] = [];
		}
		groups[item.type].push(item);
	});

	// Converting groups into the desired array format
	return Object.keys(groups).map((type) => ({
		type: type,
		values: groups[type],
	}));
};

export const getFirstDayOfMonth = () => {
	const date = new Date();
	return new Date(date.getFullYear(), date.getMonth(), 1);
};

// Function to get locale based on separator choice
const getLocale = (separator: string) => {
	return separator === "." ? "en-US" : "de-DE";
};

export const formatAmount = (amount: number, separator: string, currency: string) => {
	const locale = getLocale(separator);
	console.log(locale);
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
	}).format(amount);
};
