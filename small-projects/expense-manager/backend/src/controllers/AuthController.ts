import { Request, Response } from "express";
import authService from "../services/AuthService";
import categoryService from "../services/CategoryService";
import { isError, isFirebaseError, Logger } from "@common";
import jwt, { JwtPayload } from "jsonwebtoken";

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
			const { email, password } = req.body;

			if (!email || !password) {
				throw new Error("Email and password are required");
			}

			const token = await authService.register(email, password);

			if (token) {
				const { uid } = jwt.decode(token) as { uid: string };
				await categoryService.addDefaultCategoriesForUser(uid);

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
}

export default new AuthController();
