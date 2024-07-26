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
}

export default BaseService;
