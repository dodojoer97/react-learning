/**
 * Base service interface to define common methods for making HTTP requests.
 */
export interface IBaseService {
	baseUrl: string;

	/**
	 * Get the default headers for HTTP requests.
	 * @returns {Record<string, string>} Default headers.
	 */
	getDefaultHeaders(): Record<string, string>;

	/**
	 * Make a GET request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} [params] - Optional query parameters.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	get<T extends object>(endpoint: string, params?: T): Promise<T>;

	/**
	 * Make a POST request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	post<T extends object>(endpoint: string, data: T): Promise<T>;

	/**
	 * Make a PUT request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	put<T extends object>(endpoint: string, data: T): Promise<T>;

	/**
	 * Make a DELETE request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	delete<T>(endpoint: string): Promise<T>;
}