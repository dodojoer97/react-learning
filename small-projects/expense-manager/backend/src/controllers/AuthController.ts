// src/controllers/authController.ts
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
}

export default new AuthController();
