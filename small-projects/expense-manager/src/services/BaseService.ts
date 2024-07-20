// Interface
import { IBaseService } from "./BaseService.d";

/**
 * Base service class to be used by other services, provides a base url, and methods to handle HTTP requests.
 */
class BaseService implements IBaseService {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Get the default headers for HTTP requests.
	 * @returns {Record<string, string>} Default headers.
	 */
	getDefaultHeaders(): Record<string, string> {
		return {
			"Content-Type": "application/json",
		};
	}

	/**
	 * Make a GET request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} [params] - Optional query parameters.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	async get<T>(endpoint: string, params?: T): Promise<T> {
		if (this.isLocalEnvironment()) {
			return this.localGet<T>(endpoint, params);
		}
		const url = new URL(`${this.baseUrl}/${endpoint}`);
		if (params) {
			Object.keys(params).forEach((key) =>
				url.searchParams.append(key, (params as any)[key])
			);
		}
		const response = await fetch(url.toString(), {
			method: "GET",
			headers: this.getDefaultHeaders(),
		});
		return this.handleResponse<T>(response);
	}

	/**
	 * Make a POST request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	async post<T extends object>(endpoint: string, data: T): Promise<T> {
		if (this.isLocalEnvironment()) {
			return this.localPost<T>(endpoint, data);
		}
		const response = await fetch(`${this.baseUrl}/${endpoint}`, {
			method: "POST",
			headers: this.getDefaultHeaders(),
			body: JSON.stringify(data),
		});
		return this.handleResponse<T>(response);
	}

	/**
	 * Make a PUT request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	async put<T>(endpoint: string, data: T): Promise<T> {
		if (this.isLocalEnvironment()) {
			return this.localPut<T>(endpoint, data);
		}
		const response = await fetch(`${this.baseUrl}/${endpoint}`, {
			method: "PUT",
			headers: this.getDefaultHeaders(),
			body: JSON.stringify(data),
		});
		return this.handleResponse<T>(response);
	}

	/**
	 * Make a DELETE request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @returns {Promise<T>} A promise that resolves to the response data.
	 */
	async delete<T>(endpoint: string): Promise<T> {
		if (this.isLocalEnvironment()) {
			return this.localDelete<T>(endpoint);
		}
		const response = await fetch(`${this.baseUrl}/${endpoint}`, {
			method: "DELETE",
			headers: this.getDefaultHeaders(),
		});
		return this.handleResponse<T>(response);
	}

	/**
	 * Handle the response from the fetch request.
	 * @param {Response} response - The response object from the fetch request.
	 * @returns {Promise<T>} A promise that resolves to the parsed response data.
	 * @throws {Error} If the response is not ok.
	 */
	private async handleResponse<T>(response: Response): Promise<T> {
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText || "Network response was not ok");
		}
		const data = await response.json();
		return data as T;
	}

	/**
	 * Check if the environment is local.
	 * @returns {boolean} True if local environment, false otherwise.
	 */
	private isLocalEnvironment(): boolean {
		return this.baseUrl.includes("localStorage");
	}

	/**
	 * Local implementation of GET request with query parameters.
	 * @param {string} endpoint - The endpoint to get data from.
	 * @param {T} [params] - Optional query parameters.
	 * @returns {Promise<T>} A promise that resolves to the data.
	 */
	private async localGet<T>(endpoint: string, params?: T): Promise<T> {
		let data = localStorage.getItem(endpoint);

		if (!data) {
			return this.promisify(null as unknown as T, 1000);
		}

		try {
			const parsedData = JSON.parse(data);
			if (params) {
				// const filteredData = parsedData.filter((item: T) => {
				// 	return Object.keys(params).every(
				// 		(key) => (item as any)[key] === (params as any)[key]
				// 	);
				// });
				return this.promisify(parsedData as unknown as T, 1000);
			}
			return this.promisify(parsedData, 1000);
		} catch (e) {
			// If JSON.parse fails, return the raw string
			if (!params) {
				return this.promisify(data as unknown as T, 1000);
			} else {
				throw new Error("Filtering parameters provided, but data is not JSON");
			}
		}
	}

	/**
	 * Local implementation of POST request.
	 * @param {string} endpoint - The endpoint to post data to.
	 * @param {T} data - The data to post.
	 * @returns {Promise<T>} A promise that resolves to the data.
	 */
	private async localPost<T>(endpoint: string, data: T): Promise<T> {
		localStorage.setItem(endpoint, JSON.stringify(data));
		return this.promisify(data, 1000);
	}

	/**
	 * Local implementation of PUT request.
	 * @param {string} endpoint - The endpoint to put data to.
	 * @param {T} data - The data to put.
	 * @returns {Promise<T>} A promise that resolves to the updated data.
	 */
	private async localPut<T>(endpoint: string, data: T): Promise<T> {
		// Get the current item from localStorage
		let currentItem = localStorage.getItem(endpoint);
		if (currentItem) {
			// Parse the current item
			const currentData = JSON.parse(currentItem) as any;
			// Merge the current item with the new data
			const updatedData = Array.isArray(currentData)
				? [...currentData, ...(data as Array<any>)]
				: { ...currentData, ...data };
			// Store the updated item back in localStorage
			localStorage.setItem(endpoint, JSON.stringify(updatedData));
			return this.promisify(updatedData, 1000);
		} else {
			// If no current item, just set the new data
			localStorage.setItem(endpoint, JSON.stringify(data));
			return this.promisify(data, 1000);
		}
	}

	/**
	 * Local implementation of DELETE request.
	 * @param {string} endpoint - The endpoint to delete data from.
	 * @returns {Promise<T>} A promise that resolves to the data.
	 */
	private async localDelete<T>(endpoint: string): Promise<T> {
		const data = localStorage.getItem(endpoint);
		localStorage.removeItem(endpoint);
		return this.promisify(data ? JSON.parse(data) : null, 1000);
	}

	/**
	 * Promisify a value with a delay.
	 * @param value The value to promisify.
	 * @param delay The delay in milliseconds.
	 * @returns A promise that resolves to the value after the specified delay.
	 */
	protected promisify<T>(value: T, delay: number): Promise<T> {
		return new Promise((resolve) => setTimeout(() => resolve(value), delay));
	}
}

export default BaseService;
