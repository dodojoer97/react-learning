// src/controllers/UserController.ts
import { Request, Response } from "express";
import userService from "../services/UserService";
import { User } from "../models/User";

class UserController {
	async addUser(req: Request, res: Response): Promise<void> {
		try {
			const user: User = req.body;
			await userService.createUser(user);
			res.status(201).send(user);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	async getUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await userService.fetchUsers();
			res.status(200).send(users);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export default new UserController();
