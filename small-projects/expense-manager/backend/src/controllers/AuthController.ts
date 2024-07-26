import { Request, Response } from "express";
import authService from "../services/AuthService";

class AuthController {
	async login(req: Request, res: Response) {
		const { email, password } = req.body;
		const token = await authService.login(email, password);
		if (token) {
			res.json({ token });
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	}

	async register(req: Request, res: Response) {
		const { email, password } = req.body;
		const token = await authService.register(email, password);
		if (token) {
			res.status(201).json({ token });
		} else {
			res.status(400).json({ message: "Registration failed" });
		}
	}

	async verifyToken(req: Request, res: Response) {
		const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "No token provided" });
		}

		const result = await authService.verifyToken(token);
		if (result.valid) {
			res.status(200).json({ valid: true, user: result.user });
		} else {
			res.status(401).json({ message: "Invalid token" });
		}
	}
}

export default new AuthController();
