import { v4 as uuidv4 } from "uuid";

// Classes
import BaseService from "./BaseService";
import { Logger } from "@/classes/Logger";

// Interface
import { IAuthService } from "./AuthService.d";
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

	public signup(dto: SignupDTO): void {
		try {
			const currentUsers: User[] = this.getUsers();
			const newUser = new User(uuidv4(), dto.email, dto.password);

			const updatedUsers: User[] = [...currentUsers, newUser];

			localStorage.setItem("users", JSON.stringify(updatedUsers));
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with signup");
			}
		}
	}

	public login(dto: LoginDTO): void {
		try {
			const currentUsers: User[] = this.getUsers();
			const foundUser: User | undefined = currentUsers.find(
				(user: User) => user.email === dto.email && user.password === dto.password
			);

			if (!foundUser) {
				// Throw?
				return;
			}

			// ... Set some data for login / cookies or something
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with login");
			}
		}
	}

	public logout(): void {
		try {
			// to implement
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with logout");
			}
		}
	}

	// TODO add types

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
}

export default AuthService;
