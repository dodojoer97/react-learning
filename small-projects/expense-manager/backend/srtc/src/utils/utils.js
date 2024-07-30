"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrencySign = exports.checkValuesEqual = exports.promisify = exports.hasMinLength = exports.isEmail = void 0;
/**
 * Checks if the provided string contains an '@' character, commonly used to validate email addresses.
 *
 * @param {string} value - The string to be checked.
 * @returns {boolean} Returns true if the string includes an '@', indicating it could be an email address.
 */
const isEmail = (value) => {
    return value.includes("@");
};
exports.isEmail = isEmail;
/**
 * Determines if the provided string meets a minimum length requirement.
 *
 * @param {string} value - The string to check the length of.
 * @param {number} minLength - The minimum number of characters required.
 * @returns {boolean} Returns true if the string's length is greater than or equal to the minLength.
 */
const hasMinLength = (value, minLength) => {
    return value.length >= minLength;
};
exports.hasMinLength = hasMinLength;
/**
 * Converts a value to a Promise that resolves or rejects after a specified time.
 * This function is useful for simulating asynchronous operations in testing or development.
 *
 * @param {T} value - The value to be resolved with the promise.
 * @param {number} resolveTime - The time in milliseconds after which the promise will resolve or reject.
 * @param {boolean} shouldReject - Optional. If true, the promise will reject instead of resolve. Defaults to false.
 * @returns {Promise<T>} A promise that either resolves with the given value or rejects with an error.
 */
const promisify = (value, resolveTime, shouldReject = false) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject(new Error("Promise rejected as requested."));
            }
            else {
                resolve(value);
            }
        }, resolveTime);
    });
};
exports.promisify = promisify;
/**
 * Checks if two values are equal.
 *
 * @template T - The type of the values to compare.
 * @param {T} value1 - The first value to compare.
 * @param {T} value2 - The second value to compare.
 * @returns {boolean} - Returns true if the values are equal, otherwise false.
 */
const checkValuesEqual = (value1, value2) => {
    return value1 === value2;
};
exports.checkValuesEqual = checkValuesEqual;
/**
 * Retrieves the currency sign for a given currency code.
 *
 * This function uses `Intl.NumberFormat` to format a number according to the specified currency
 * and extracts the currency sign from the formatted parts.
 *
 * @param {string} currency - The currency code (e.g., "USD", "ILS").
 * @returns {string} - The currency sign associated with the given currency code.
 */
const getCurrencySign = (currency) => {
    var _a;
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    });
    const parts = formatter.formatToParts(1.0);
    const currencySign = ((_a = parts.find((part) => part.type === "currency")) === null || _a === void 0 ? void 0 : _a.value) || "";
    return currencySign;
};
exports.getCurrencySign = getCurrencySign;
