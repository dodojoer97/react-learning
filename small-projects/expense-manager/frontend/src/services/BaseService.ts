// Interface
import { IBaseService, RequestOptions } from "./BaseService.d";

/**
 * Base service class to be used by other services, provides a base URL, and methods to handle HTTP requests.
 */
class BaseService implements IBaseService {
	baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	/**
	 * Get the default headers for HTTP requests.
	 * @returns {Transaction<string, string>} Default headers.
	 */
	public getDefaultHeaders(auth?: boolean): Record<string, string> {
		const params: Record<string, string> = {
			"Content-Type": "application/json",
		};

		const token: string | null = this.getToken();

		if (auth && token) {
			params["Authorization"] = `Bearer ${token}`;
		}

		return params;
	}

	/**
	 * Make a GET request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	public async get(endpoint: string, options?: RequestOptions): Promise<any> {
		const url = new URL(`${this.baseUrl}/${endpoint}`);
		if (options?.params) {
			Object.keys(options.params).forEach((key) =>
				url.searchParams.append(key, options.params![key])
			);
		}
		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				...this.getDefaultHeaders(options && options.auth),
				...options?.headers,
			},
		});
		return this.handleResponse<any>(response);
	}

	/**
	 * Make a POST request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	public async post<T extends object>(
		endpoint: string,
		data: T,
		options?: RequestOptions
	): Promise<any> {
		const response = await fetch(`${this.baseUrl}/${endpoint}`, {
			method: "POST",
			headers: {
				...this.getDefaultHeaders(options && options.auth),
				...options?.headers,
			},
			body: JSON.stringify(data),
		});
		return this.handleResponse<any>(response);
	}

	/**
	 * Make a PUT request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {T} data - The data to send in the request body.
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	public async put<T extends object>(
		endpoint: string,
		data: T,
		options?: RequestOptions
	): Promise<any> {
		const response = await fetch(`${this.baseUrl}/${endpoint}`, {
			method: "PUT",
			headers: {
				...this.getDefaultHeaders(options && options.auth),
				...options?.headers,
			},
			body: JSON.stringify(data),
		});
		return this.handleResponse<any>(response);
	}

	/**
	 * Make a DELETE request to the specified endpoint.
	 * @param {string} endpoint - The endpoint to send the request to.
	 * @param {RequestOptions} [options] - Optional query parameters and headers.
	 * @returns {Promise<any>} A promise that resolves to the response data.
	 */
	public async delete(endpoint: string, options?: RequestOptions): Promise<any> {
		const response = await fetch(`${this.baseUrl}/${endpoint}`, {
			method: "DELETE",
			headers: {
				...this.getDefaultHeaders(options && options.auth),
				...options?.headers,
			},
		});
		return this.handleResponse<any>(response);
	}

	/**
	 * Handle the response from the fetch request.
	 * @param {Response} response - The response object from the fetch request.
	 * @returns {Promise<any>} A promise that resolves to the parsed response data.
	 * @throws {Error} If the response is not ok.
	 */
	private async handleResponse<T>(response: Response): Promise<any> {
		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(errorText || "Network response was not ok");
		}
		const data = await response.json();
		return data as T;
	}

	/**
	 * Retrieves the authentication token from local storage.
	 * @returns {Promise<T | null>} The authentication token if available, otherwise null.
	 */
	protected getToken(): string | null {
		return localStorage.getItem("token");
	}
}

export default BaseService;
