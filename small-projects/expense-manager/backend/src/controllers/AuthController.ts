import { Request, Response } from "express";
import authService from "../services/AuthService";
import categoryService from "../services/CategoryService";
import settingsService from "@/services/SettingsService";

import { isError, isFirebaseError, Logger } from "@common";
import jwt, { JwtPayload } from "jsonwebtoken";
// Models
import { User } from "@common";

const logger = new Logger("AuthController");

class AuthController {
	async login(req: Request, res: Response) {
		try {
			const { email, password } = req.body;

			if (!email || !password) {
				throw new Error("Email and password are required");
			}

			const token = await authService.login(email, password);
			if (token) {
				res.json({ token });
			} else {
				res.status(401).json({ message: "Invalid email or password" });
			}
		} catch (error) {
			if (isFirebaseError(error)) {
				switch (error.code) {
					case "auth/wrong-password":
						res.status(401).json({ message: "Wrong password" });
						break;
					case "auth/user-not-found":
						res.status(404).json({ message: "User not found" });
						break;
					// Handle other Firebase Auth errors
					default:
						logger.error(`Firebase Auth Error during login: ${error.message}`);
						res.status(500).json({ message: "Internal server error" });
				}
			} else if (isError(error)) {
				logger.error(`Error during login: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during login");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	async register(req: Request, res: Response) {
		try {
			const { email, password, displayName } = req.body;

			if (!email || !password || !displayName) {
				throw new Error("Email and password, displayName are required");
			}

			const token = await authService.register(email, password, displayName);

			if (token) {
				const { uid } = jwt.decode(token) as { uid: string };

				// Assign default data
				await categoryService.addDefaultCategoriesForUser(uid);
				await settingsService.createInitialSettings(uid);

				res.status(201).json({ token });
			} else {
				res.status(400).json({ message: "Registration failed" });
			}
		} catch (error) {
			if (isFirebaseError(error)) {
				switch (error.code) {
					case "auth/email-already-in-use":
						res.status(400).json({ message: "Email already in use" });
						break;
					// Handle other Firebase Auth errors
					default:
						logger.error(`Firebase Auth Error during registration: ${error.message}`);
						res.status(500).json({ message: "Internal server error" });
				}
			} else if (isError(error)) {
				logger.error(`Error during registration: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during registration");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	async verifyToken(req: Request, res: Response) {
		try {
			const token = req.headers.authorization?.split(" ")[1];
			if (!token) {
				return res.status(401).json({ message: "No token provided" });
			}

			const result = await authService.verifyToken(token);
			if (result.valid) {
				res.status(200).json({ valid: true, user: result.user });
			} else {
				res.status(401).json({ message: "Invalid token" });
			}
		} catch (error) {
			if (isFirebaseError(error)) {
				logger.error(`Firebase Auth Error during token verification: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else if (isError(error)) {
				logger.error(`Error during token verification: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during token verification");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	async requestPasswordReset(req: Request, res: Response) {
		try {
			const { email } = req.body;

			if (!email) {
				throw new Error("Email is required");
			}

			const sendPasswordResponse = await authService.sendPasswordResetEmail(email);
			res.status(sendPasswordResponse.status).json({ message: sendPasswordResponse.message });
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during requestPasswordReset: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during requestPasswordReset");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	async resetPassword(req: Request, res: Response) {
		const { password } = req.body;

		try {
			// @ts-ignore
			// user provided by middelware
			if (req.user) {
				// @ts-ignore
				await authService.resetPassword(req.user, password);
				res.status(200).json({ message: "Password updated" });
			} else {
				res.status(500).json({ message: "Internal server error" });
			}
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during resetPassword: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during resetPassword");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	async updateUserInfo(req: Request, res: Response) {
		const { ...fields }: Omit<User, "password" | "uid"> = req.body;

		try {
			// @ts-ignore
			// user provided by middelware
			if (req.user) {
				// @ts-ignore
				await authService.updateUserInfo(req.user, { ...fields });
				res.status(200).json({ message: "Info updated" });
			} else {
				res.status(500).json({ message: "Internal server error" });
			}
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during updateUserInfo: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during updateUserInfo");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	async getUserInfo(req: Request, res: Response) {
		try {
			const { userId } = req.params;

			const foundUser = await authService.getUserInfo(userId);

			if (foundUser) {
				res.status(200).json(foundUser);
			} else {
				res.status(404).json({ message: "No user found with id" });
			}
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during getUserInfo: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during getUserInfo");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}
}

export default new AuthController();
