// Types
import { IAuthService } from "../services/AuthService.d";
import { ILoadingContext } from "@/types/common/index";

import User from "../models/User";

export interface IAuthContext extends ILoadingContext {
	signup: (dto: any) => Promise<void>;
	login: (dto: any) => Promise<void>;
	logout: () => Promise<void>;
	clearError: () => void;
	setLoading: (loading: boolean) => void;
	setUser: (user: User) => void;
	verifyToken: () => Promise<User | undefined>;
	user: User | undefined;
	error: string | null;
	loading: boolean;
}
