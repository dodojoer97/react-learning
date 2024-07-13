// Types
import { IAuthService } from "../services/AuthService.d";
import User from "../models/User";

export interface IAuthContext {
	signup: (dto: SignupDTO) => void;
	login: (dto: LoginDTO) => void;
	logout: () => void;
	user: User | undefined;
	loading: boolean;
	error: string | null;
}
