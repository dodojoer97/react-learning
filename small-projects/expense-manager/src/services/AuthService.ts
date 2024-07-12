// Classes
import BaseService from "./BaseService";
import { Logger } from "@/classes/Logger";

// Interface
import { IAuthService } from "./AuthService.d";
import LoginDTO from "@/DTO/request/Login";
import SignupDTO from "@/DTO/request/Signup";

/**
 * Auth service to handle sign up login and logout
 */

const logger = new Logger("AuthService");

class AuthService extends BaseService implements IAuthService {
	constructor() {
		// TODO when implementing with api
		const baseUrl = "http://localhost:8000/someurl";
		super(baseUrl);
	}

	public signup(dto: SignupDTO): void {
		try {
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with signup");
			}
		}
	}

	public login(dto: LoginDTO): void {
		try {
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with login");
			}
		}
	}

	public logout(): void {
		try {
		} catch (error) {
			if (error instanceof Error) {
				logger.error(error.message || "Something went wrong with logout");
			}
		}
	}
}

export default AuthService;
