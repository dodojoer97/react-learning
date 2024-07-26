/**
 * Base RequestOptions interface to define common options for making HTTP requests.
 */
export interface RequestOptions {
	headers?: Record<string, string>;
	params?: Record<string, string>;
}

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
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	get(endpoint: string, options?: RequestOptions): Promise<any>;

	/**
	 * Make a POST request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	post<T extends object>(endpoint: string, data: T, options?: RequestOptions): Promise<any>;

	/**
	 * Make a PUT request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	put<T extends object>(endpoint: string, data: T, options?: RequestOptions): Promise<any>;

	/**
	 * Make a DELETE request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	delete(endpoint: string, options?: RequestOptions): Promise<any>;
}
