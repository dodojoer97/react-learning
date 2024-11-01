// Firebase
import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "../config/firebase";

// Repositories
import userRepository from "../repositories/UserRepository";

// Services
import emailService from "@/services/EmailService";

// JWT
import jwt, { JwtPayload } from "jsonwebtoken";

// Common
import { isError, Logger } from "@common";

// Models
import { User } from "@/models/User";

const logger = new Logger("AuthService");

// Interfaces
interface PasswordResetResponse {
	message: string;
	status: number;
}

class AuthService {
	private jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

	async login(email: string, password: string): Promise<string | null> {
		try {
			if (!email || !password) {
				throw new Error("Email and password are required");
			}

			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			if (user) {
				const token = jwt.sign({ uid: user.uid, email: user.email }, this.jwtSecret, {
					expiresIn: "1h",
				});
				logger.info(`User ${email} logged in successfully`);
				return token;
			}

			logger.warn(`Login failed for user ${email}`);
			return null;
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during login: ${error.message}`);
				throw new Error();
			} else {
				logger.error("An unknown error occurred during login");
			}
			throw error;
		}
	}

	async register(email: string, password: string): Promise<string | null> {
		try {
			if (!email || !password) {
				throw new Error("Email and password are required");
			}

			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			if (user) {
				const token = jwt.sign({ uid: user.uid, email: user.email }, this.jwtSecret, {
					expiresIn: "1h",
				});
				logger.info(`User ${email} registered successfully`);
				return token;
			}

			logger.warn(`Registration failed for user ${email}`);
			return null;
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during registration: ${error.message}`);
			} else {
				logger.error("An unknown error occurred during registration");
			}
			throw error;
		}
	}

	async verifyToken(token: string): Promise<{ valid: boolean; user?: any }> {
		try {
			if (!token) {
				throw new Error("Token is required");
			}

			const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
			console.log("decoded: ", decoded);
			const user = await userRepository.getUserByEmail(decoded.email);
			if (user) {
				logger.info(`Token verified for user ${decoded.email}`);
				return { valid: true, user };
			}
			logger.warn(`Token verification failed for token: ${token}`);
			return { valid: false };
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during token verification: ${error.message}`);
			} else {
				logger.error("An unknown error occurred during token verification");
			}
			return { valid: false };
		}
	}

	async sendPasswordResetEmail(email: string): Promise<PasswordResetResponse> {
		const result: PasswordResetResponse = {
			status: 200,
			message: "If an account with that email exists, a password reset link has been sent.",
		};

		try {
			const user = await userRepository.getUserByEmail(email);

			if (user) {
				await emailService.sendPasswordResetEmail(email);
			}

			// Always return the same response
			return result;
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during sendPasswordResetEmail: ${error.message}`);
			} else {
				logger.error("An unknown error occurred during sendPasswordResetEmail");
			}
			return { message: "Something went wrong in sendPasswordResetEmail", status: 500 };
		}
	}

	async resetPassword(user: User, newPassword: string): Promise<void> {
		try {
			const foundUser = await userRepository.getUserByEmail(user.email);

			if (foundUser) {
				await userRepository.updateUser(foundUser.uid, newPassword);
			}
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during  resetPassword: ${error.message}`);
			} else {
				logger.error("An unknown error occurred during resetPassword");
			}
			throw error;
		}
	}
}

export default new AuthService();
