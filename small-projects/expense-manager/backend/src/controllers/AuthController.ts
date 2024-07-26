import { Request, Response } from "express";
import authService from "../services/AuthService";
import { Logger } from "../../../common/classes/Logger";
import isError from "../../../common/utils/isError";

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
			if (isError(error)) {
				logger.error(`Error during login: ${error.message}`);
			} else {
				logger.error("An unknown error occurred during login");
			}
			res.status(500).json({ message: "Internal server error" });
		}
	}

	async register(req: Request, res: Response) {
		try {
			console.log("register");
			const { email, password } = req.body;

			if (!email || !password) {
				throw new Error("Email and password are required");
			}

			const token = await authService.register(email, password);
			if (token) {
				res.status(201).json({ token });
			} else {
				res.status(400).json({ message: "Registration failed" });
			}
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during registration: ${error.message}`);
			} else {
				logger.error("An unknown error occurred during registration");
			}
			res.status(500).json({ message: "Internal server error" });
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
			if (isError(error)) {
				logger.error(`Error during token verification: ${error.message}`);
			} else {
				logger.error("An unknown error occurred during token verification");
			}
			res.status(500).json({ message: "Internal server error" });
		}
	}
}

export default new AuthController();
