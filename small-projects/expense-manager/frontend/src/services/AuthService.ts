// Classes
import BaseService from "./BaseService";
import { Logger } from "@common";

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
import ResetPasswordEmailDTO from "@/DTO/request/ResetPasswordEmail";

const logger = new Logger("AuthService");

interface TokenPayload {
	uid: string;
	email: string;
	displayName: string;
	exp: number; // Expiration time in seconds since epoch
}

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
				"auth/register",
				dto
			);

			this.storeToken(response.token);
			const { email, uid, displayName } = this.decodeToken(response.token);
			return { email, uid, displayName };
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
		const currentUser = this.verifyToken();
		if (currentUser) {
			return currentUser;
		}

		try {
			const response: LoginResponseDTO = await this.post<LoginRequestDTO>("auth/login", dto);

			this.storeToken(response.token);
			const { email, uid, displayName } = this.decodeToken(response.token);
			return { email, uid, displayName };
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
	 * @returns {User | undefined} user object if the token is valid, or undefined if it is not.
	 */
	public verifyToken(providedToken?: string): User | undefined {
		try {
			const token = providedToken || this.getToken();

			if (!token) return undefined;

			const expired = this.isTokenExpired(token);

			if (!expired) {
				const { email, uid, displayName } = this.decodeToken(token);

				return { email, uid, displayName };
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
	 *
	 * @param {ResetPasswordEmailDTO} dto The data transfer object containing the email.
	 * @returns
	 */
	public async sendResetPasswordEmail(dto: ResetPasswordEmailDTO): Promise<void> {
		try {
			await this.post("auth/request-password-reset", dto);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with sendResetPassword");
			}
			throw error;
		}
	}

	/**
	 *
	 * @param {string} password
	 * @param {string} token
	 */
	async resetPassword(password: string, token: string): Promise<void> {
		try {
			await this.put(
				"auth/reset-password",
				{ password },
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with sendResetPassword");
			}
			throw error;
		}
	}

	/**
	 *
	 * @param {User} userInfo the user data to update
	 */
	async updateUserInfo(userInfo: Omit<User, "uid">) {
		try {
			await this.put("auth/update-info", { ...userInfo }, { auth: true });
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with sendResetPassword");
			}
			throw error;
		}
	}

	/**
	 *
	 * @param {string} userId the user id to retrieve
	 */
	async getUserInfo(userId: string): Promise<User> {
		try {
			const userInfo = await this.get(`/auth/user-info/${userId}`);
			return userInfo;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with sendResetPassword");
			}
			throw error;
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
	 * Decodes a JWT token and returns its payload.
	 * @param {string} token - The JWT token to decode.
	 * @returns {any} - Returns the decoded payload of the token.
	 */
	private decodeToken(token: string): TokenPayload {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload;
	}

	/**
	 * Checks if the given JWT token is expired by comparing the token's `exp` field with the current time.
	 * @param {string} token - The JWT token to check for expiration.
	 * @returns {boolean} - Returns `true` if the token is expired, `false` otherwise.
	 */
	private isTokenExpired(token: string): boolean {
		if (!token) return true;

		try {
			// Use the decodeToken method to get the payload
			const payload = this.decodeToken(token);

			// Get the current time in seconds since epoch
			const currentTime = Math.floor(Date.now() / 1000);

			// Check if the token has expired by comparing the expiration time (exp) with the current time
			return payload.exp < currentTime;
		} catch (error) {
			// In case of any error during decoding, consider the token expired
			return true;
		}
	}
}

export default AuthService;
