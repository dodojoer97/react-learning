import LoginDTO from "@/DTO/request/Login";
import RegisterDTO from "@/DTO/request/Register";
import ResetPasswordEmailDTO from "@/DTO/request/ResetPasswordEmail";

export interface IAuthService {
	/**
	 * Signs up a new user using the provided DTO and returns the user object or undefined if an error occurs.
	 * @param {RegisterDTO} dto - The data transfer object containing the signup information.
	 * @returns {Promise<User | undefined>} A promise that resolves to the new user object or undefined.
	 */
	register(dto: RegisterDTO): Promise<User | undefined>;

	/**
	 * Logs in a user using the provided DTO and returns the user object or undefined if an error occurs.
	 * @param {LoginDTO} dto - The data transfer object containing the login credentials.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object or undefined.
	 */
	login(dto: LoginDTO): Promise<User | undefined>;

	/**
	 * sends a password reset to an email
	 * @param {ResetPasswordEmailDTO} dto - The data transfer object containing the reset password credentials.
	 * @returns {Promise<void>}
	 */
	sendResetPasswordEmail(dto: ResetPasswordEmailDTO): Promise<void>;

	/**
	 * sends a password reset to an email
	 * @param {string} password - the new password for the uer
	 * @param {string} token - the token for the user
	 * @returns {Promise<void>}
	 */
	resetPassword(password: string, token: string): Promise<void>;

	/**
	 * Logs out the current user by clearing the stored authentication token.
	 * @returns {Promise<void>} A promise that resolves when the logout process is complete.
	 */
	logout(): Promise<void>;

	/**
	 * Simulates validation of the authentication token by retrieving the user associated with it.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object if the token is valid, or undefined if it is not or an error occurs.
	 */
	verifyToken(): User | undefined;
}
