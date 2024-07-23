// src/services/UserService.ts
import userRepository from "../repositories/UserRepository";
import { User } from "../models/User";

class UserService {
	async createUser(user: User): Promise<void> {
		await userRepository.addUser(user);
	}

	async fetchUsers(): Promise<User[]> {
		return await userRepository.getUsers();
	}
}

export default new UserService();
