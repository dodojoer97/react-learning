import { v4 as uuidv4 } from "uuid";

// Classes
import BaseService from "./BaseService";
import { Logger } from "@/classes/Logger";

// Interface
import { IAuthService } from "@/services/AuthService.d";

// *** DTO ***
// * Request *
import LoginRequestDTO from "@/DTO/request/Login";
import RegisterRequestDTO from "@/DTO/request/Register";

// * Response *
import RegisterResponseDTO from "@/DTO/response/Register";
import LoginResponseDTO from "@/DTO/response/Login";

// Models
import User from "@/models/User";

const logger = new Logger("AuthService");

/**
 * AuthService class for handling authentication processes like login, signup, and logout.
 * Extends BaseService to use common service functionalities.
 */
class AuthService extends BaseService implements IAuthService {
	/**
	 * AuthService constructor.
	 * Sets up the base URL for the API.
	 */
	constructor() {
		const baseUrl = "http://localhost:3000";
		super(baseUrl);
	}

	/**
	 * Signs up a new user and stores it in the local storage.
	 * @param {RegisterRequestDTO} dto - The data transfer object containing the signup information.
	 * @returns {Promise<User | undefined>} A promise that resolves to the new user object or undefined if an error occurs.
	 */
	public async register(dto: RegisterRequestDTO): Promise<User | undefined> {
		try {
			const response: RegisterResponseDTO = await this.post<RegisterRequestDTO>(
				"/auth/register",
				dto
			);

			this.storeToken(response.token);
			const decodedUser = this.decodeToken(response.token);
			return decodedUser;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with signup");
			}
			throw error;
		}
	}

	/**
	 * Logs in a user if the user exists.
	 * @param {LoginRequestDTO} dto - The data transfer object containing the login credentials.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object if found, or undefined if not.
	 */
	public async login(dto: LoginRequestDTO): Promise<User | undefined> {
		try {
			const response: LoginResponseDTO = await this.post<LoginRequestDTO>("/auth/login", dto);

			this.storeToken(response.token);
			const decodedUser = this.decodeToken(response.token);
			return decodedUser;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with login");
			}
			throw error;
		}
	}

	/**
	 * Logs out the current user. Placeholder implementation, needs real logic.
	 * @returns {Promise<void>}
	 */
	public async logout(): Promise<void> {
		try {
			this.removeToken();
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with logout");
			}
			throw error;
		}
	}

	/**
	 * Verifies the token by sending it to the backend for verification.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object if the token is valid, or undefined if it is not.
	 */
	public async verifyToken(): Promise<User | undefined> {
		try {
			const token = this.getToken();
			if (!token) return undefined;

			const response = await this.get("/auth/verify-token", {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (response.valid) {
				return response.user;
			} else {
				this.removeToken();
				return undefined;
			}
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with verifyToken");
			}
			this.removeToken();
			return undefined;
		}
	}

	/**
	 * Stores the authentication token in local storage.
	 * @param {string} token - The authentication token to be stored.
	 */
	private storeToken(token: string): void {
		localStorage.setItem("token", token);
	}

	/**
	 * Removes the authentication token from local storage.
	 */
	private removeToken(): void {
		localStorage.removeItem("token");
	}

	/**
	 * Retrieves the authentication token from local storage.
	 * @returns {Promise<T | null>} The authentication token if available, otherwise null.
	 */
	private getToken(): string | null {
		return localStorage.getItem("token");
	}

	private decodeToken(token: string): User {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return new User(payload.uid, payload.email);
	}
}

export default AuthService;
