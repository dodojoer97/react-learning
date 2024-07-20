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
	public async signup(dto: SignupDTO): Promise<User | undefined> {
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
				this.storeToken(foundUser.id);
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
			this.removeToken();
			await this.promisify<void>(undefined, 500);
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
	private storeToken(token: string): void {
		localStorage.setItem("authToken", token);
	}

	/**
	 * Removes the authentication token from local storage.
	 */
	private removeToken(): void {
		localStorage.removeItem("authToken");
	}

	/**
	 * Retrieves the authentication token from local storage.
	 * @returns {string | null} The authentication token if available, otherwise null.
	 */
	private getToken(): string | null {
		return localStorage.getItem("authToken");
	}

	// ****** TODO create real backend *****
	/**
	 * Simulates validation of the authentication token by retrieving the user associated with it.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object if the token is valid, or undefined if it is not or an error occurs.
	 */
	public async verifyToken(): Promise<User | undefined> {
		try {
			const token = this.getToken(); // Retrieves the token from local storage
			const users = (await this.get<User[]>("users")) || []; // Retrieves all users
			const user = users.find((user) => user.id === token); // Finds the user with the matching token

			return user; // Returns the user asynchronously, simulating a delayed response
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with verifyToken");
			}
			throw error;
		}
	}

	/**
	 * Retrieves all users from local storage.
	 * @returns {User[]} An array of user objects.
	 */
	private async getUsers(): Promise<User[]> {
		const currentUsersList = await this.get<User[]>("users");
		if (!currentUsersList || currentUsersList.length === 0) {
			logger.info("No available users in signup");
			return [];
		}

		return currentUsersList;
	}

	/**
	 * Finds a user that matches the provided DTO credentials.
	 * @param {LoginDTO | SignupDTO} dto - DTO containing email and password for user lookup.
	 * @returns {User | undefined} The found user or undefined if no user matches the credentials.
	 */
	private async getUser(dto: LoginDTO | SignupDTO): Promise<User | undefined> {
		try {
			const currentUsers: User[] = await this.getUsers();
			const foundUser: User | undefined = currentUsers.find(
				(user: User) => user.email === dto.email && user.password === dto.password
			);

			if (!foundUser) throw new Error("No user found with specified credentials");

			return foundUser;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with getUser");
			}
			throw error;
		}
	}

	/**
	 * Checks if an email already exists in the users array.
	 * @param {string} email - The email to check.
	 * @returns {Promise<boolean>} True if the email exists, otherwise false.
	 */
	private async checkEmailExists(email: string): Promise<boolean> {
		const currentUsers: User[] = await this.getUsers();

		// Array of emails
		const emails = currentUsers.map((user: User) => user.email);

		return emails.includes(email);
	}
}

export default AuthService;
