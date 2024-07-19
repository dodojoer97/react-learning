// Types
import { IAuthService } from "../services/AuthService.d";
import User from "../models/User";

export interface IAuthContext {
	signup: (dto: SignupDTO) => Promise<void>;
	login: (dto: LoginDTO) => Promise<void>;
	logout: () => Promise<void>;
	clearError: () => void;
	setLoading: (loading: boolean) => void;
	setUser: (user: User) => void;
	user: User | undefined;
	loading: boolean;
	error: string | null;
}
