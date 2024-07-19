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

// Utils
import { promisify } from "@/utils/utils";

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
		const baseUrl = "http://localhost:8000/someurl";
		super(baseUrl);
	}

	/**
	 * Signs up a new user and stores it in the local storage.
	 * @param {SignupDTO} dto - The data transfer object containing the signup information.
	 * @returns {Promise<User | undefined>} A promise that resolves to the new user object or undefined if an error occurs.
	 */
	public async signup(dto: SignupDTO): Promise<User | undefined> {
		try {
			if (this.checkEmailExists(dto.email))
				throw new Error("User with same credetials already exists");

			const currentUsers: User[] = this.getUsers();
			const newUser = new User(uuidv4(), dto.email, dto.password);

			const updatedUsers: User[] = [...currentUsers, newUser];

			localStorage.setItem("users", JSON.stringify(updatedUsers));

			return promisify(newUser, 1000);
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
			const foundUser: User | undefined = this.getUser(dto);

			if (foundUser) {
				this.storeToken(foundUser.id);
			}

			return promisify(foundUser, 500);
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
			promisify("", 500);
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

	// ****** TODO create real backed *****
	/**
	 * Simulates validation of the authentication token by retrieving the user associated with it.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object if the token is valid, or undefined if it is not or an error occurs.
	 */
	public async verifyToken(): Promise<User | undefined> {
		try {
			const token = this.getToken(); // Retrieves the token from local storage
			const users = this.getUsers(); // Retrieves all users
			const user = users.find((user) => user.id === token); // Finds the user with the matching token

			return promisify(user, 1000); // Returns the user asynchronously, simulating a delayed response
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with getUser");
			}
			throw error;
		}
	}

	/**
	 * Retrieves all users from local storage.
	 * @returns {User[]} An array of user objects.
	 */
	private getUsers(): User[] {
		const currentUsersList = localStorage.getItem("users");
		if (!currentUsersList && !currentUsersList?.length) {
			logger.info("No available users in signup");
			return [];
		}

		const parsedUsers = JSON.parse(currentUsersList);
		return parsedUsers;
	}

	/**
	 * Finds a user that matches the provided DTO credentials.
	 * @param {LoginDTO | SignupDTO} dto - DTO containing email and password for user lookup.
	 * @returns {User | undefined} The found user or undefined if no user matches the credentials.
	 */
	private getUser(dto: LoginDTO | SignupDTO): User | undefined {
		try {
			const currentUsers: User[] = this.getUsers();
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
	 * Finds a user that matches the provided DTO credentials.
	 * @param {string} email  - email string
	 * @returns {boolean} check if the email is in the users array
	 */
	private checkEmailExists(email: string): boolean {
		const currentUsers: User[] = this.getUsers();

		// Array of emails
		const emails = currentUsers.map((user: User) => user.email);

		return emails.includes(email);
	}
}

export default AuthService;
