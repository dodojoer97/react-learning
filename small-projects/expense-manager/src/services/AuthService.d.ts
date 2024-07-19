export interface IAuthService {
	/**
	 * Signs up a new user using the provided DTO and returns the user object or undefined if an error occurs.
	 * @param {SignupDTO} dto - The data transfer object containing the signup information.
	 * @returns {Promise<User | undefined>} A promise that resolves to the new user object or undefined.
	 */
	signup(dto: SignupDTO): Promise<User | undefined>;

	/**
	 * Logs in a user using the provided DTO and returns the user object or undefined if an error occurs.
	 * @param {LoginDTO} dto - The data transfer object containing the login credentials.
	 * @returns {Promise<User | undefined>} A promise that resolves to the user object or undefined.
	 */
	login(dto: LoginDTO): Promise<User | undefined>;

	/**
	 * Logs out the current user by clearing the stored authentication token.
	 * @returns {Promise<void>} A promise that resolves when the logout process is complete.
	 */
	logout(): Promise<void>;

	/**
	 * Verifies if the provided token is valid by checking against a list of known user tokens.
	 * @param {string} token - The authentication token to verify.
	 * @returns {Promise<boolean>} True if the token is valid, otherwise false.
	 */
	verifyToken(token: string): Promise<boolean>;
}
