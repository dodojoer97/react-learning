"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFirebaseError = exports.isError = void 0;
/**
 * Type guard for determining if a given value is an instance of Error.
 * This function checks if the provided value is an instance of the Error class.
 *
 * @param {unknown} error - The value to be checked.
 * @returns {boolean} Returns true if the value is an Error, false otherwise.
 */
const isError = (error) => {
    return error instanceof Error;
};
exports.isError = isError;
/**
 * Type guard for determining if a given value is an instance of FirebaseError.
 * This function checks if the provided value is an object with a `code` property.
 *
 * @param {unknown} error - The value to be checked.
 * @returns {boolean} Returns true if the value is a FirebaseError, false otherwise.
 */
const isFirebaseError = (error) => {
    return typeof error === "object" && error !== null && "code" in error;
};
exports.isFirebaseError = isFirebaseError;
//# sourceMappingURL=isError.js.map