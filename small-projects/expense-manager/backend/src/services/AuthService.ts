import {
	auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "../config/firebaseClient";
import userRepository from "../repositories/UserRepository";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Logger } from "../../../common/classes/Logger";
import isError from "../../../common/utils/isError";

const logger = new Logger("AuthService");

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
			} else {
				logger.error("An unknown error occurred during login");
			}
			return null;
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
			return null;
		}
	}

	async verifyToken(token: string): Promise<{ valid: boolean; user?: any }> {
		try {
			if (!token) {
				throw new Error("Token is required");
			}

			const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
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
}

export default new AuthService();
