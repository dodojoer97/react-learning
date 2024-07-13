import { v4 as uuidv4 } from "uuid";

// Classes
import BaseService from "./BaseService";
import { Logger } from "@/classes/Logger";

// Interface
import { IAuthService } from "@/services/AuthService.d";
import LoginDTO from "@/DTO/request/Login";
import SignupDTO from "@/DTO/request/Signup";

// Models
import User from "@/models/User";

const logger = new Logger("AuthService");

/**
 * Auth service to handle sign up login and logout
 */

class AuthService extends BaseService implements IAuthService {
	constructor() {
		// TODO when implementing with api
		const baseUrl = "http://localhost:8000/someurl";
		super(baseUrl);
	}

	public async signup(dto: SignupDTO): Promise<User | undefined> {
		try {
			const currentUsers: User[] = this.getUsers();
			const newUser = new User(uuidv4(), dto.email, dto.password);

			const updatedUsers: User[] = [...currentUsers, newUser];

			localStorage.setItem("users", JSON.stringify(updatedUsers));

			return newUser;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with signup");
			}
			throw error;
		}
	}

	public async login(dto: LoginDTO): Promise<User | undefined> {
		try {
			const foundUser: User | undefined = this.getUser(dto);

			if (!foundUser) {
				// Throw?
				alert(" no found user");

				return;
			}

			// ... Set some data for login / cookies or something
			alert("logged in");
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with login");
			}
			throw error;
		}
	}

	public async logout(): Promise<void> {
		try {
			// to implement
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with logout");
			}
			throw error;
		}
	}

	// ** this methods will be later in the backend, mock with local storage
	private getUsers(): User[] {
		const currentUsersList = localStorage.getItem("users");
		if (!currentUsersList && !currentUsersList?.length) {
			logger.info("No avaiable users in signup");
			return [];
		}

		const parsedUsers = JSON.parse(currentUsersList);
		return parsedUsers;
	}

	private getUser(dto: LoginDTO | SignupDTO): User | undefined {
		try {
			const currentUsers: User[] = this.getUsers();
			const foundUser: User | undefined = currentUsers.find(
				(user: User) => user.email === dto.email && user.password === dto.password
			);

			if (!foundUser) throw new Error("No user found");

			return foundUser;
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with getUser");
			}
			throw error;
		}
	}
}

export default AuthService;
