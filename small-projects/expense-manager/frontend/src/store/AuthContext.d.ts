// Types
import { IAuthService } from "../services/AuthService.d";
import { ILoadingContext } from "@/types/common/index";

import User from "../models/User";

export interface IAuthContext extends ILoadingContext {
	signup: (dto: RegisterDTO) => Promise<void>;
	login: (dto: LoginDTO) => Promise<void>;
	logout: () => Promise<void>;
	clearError: () => void;
	setLoading: (loading: boolean) => void;
	setUser: (user: User) => void;
	user: User | undefined;
	error: string | null;
}
