import { v4 as uuidv4 } from "uuid";

// Classes
import BaseService from "./BaseService";
import { Logger } from "@/classes/Logger";

// Interface
import { IAuthService } from "@/services/AuthService.d";
import LoginDTO from "@/DTO/request/Login";
import SignupDTO from "@/DTO/request/Signup";

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
		const baseUrl = "localStorage";
		super(baseUrl);
	}

	/**
	 * Signs up a new user and stores it in the local storage.
	 * @param {SignupDTO} dto - The data transfer object containing the signup information.
	 * @returns {Promise<User | undefined>} A promise that resolves to the new user object or undefined if an error occurs.
	 */
	public async register(dto: SignupDTO): Promise<User | undefined> {
		try {
			if (await this.checkEmailExists(dto.email)) {
				throw new Error("User with same credentials already exists");
			}

			const currentUsers: User[] = (await this.get<User[]>("users")) || [];
			const newUser = new User(uuidv4(), dto.email, dto.password);

			const updatedUsers: User[] = [...currentUsers, newUser];

			await this.put("users", updatedUsers);

			return newUser;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with signup");
			}
			throw error;
		}
	}

	/**
	 * Logs in a user if the user exists.
	 * @param {LoginDTO} dto - The data transfer object containing the login credentials.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object if found, or undefined if not.
	 */
	public async login(dto: LoginDTO): Promise<User | undefined> {
		try {
			const foundUser: User | undefined = await this.getUser(dto);

			if (foundUser) {
				await this.storeToken(foundUser.id);
			}

			return foundUser;
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
			await this.removeToken();
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with logout");
			}
			throw error;
		}
	}

	/**
	 * Stores the authentication token in local storage.
	 * @param {string} token - The authentication token to be stored.
	 */
	private async storeToken(token: string): Promise<void> {
		await this.put("authToken", { token });
	}

	/**
	 * Removes the authentication token from local storage.
	 */
	private async removeToken(): Promise<void> {
		await this.delete("authToken");
	}

	/**
	 * Retrieves the authentication token from local storage.
	 * @returns {Promise<T | null>} The authentication token if available, otherwise null.
	 */
	private async getToken<T extends { token: string }>(): Promise<T | null> {
		return await this.get("toehn");
	}

	private decodeToken(token: string): User {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return new User(payload.uid, payload.email);
	}
}

export default AuthService;
