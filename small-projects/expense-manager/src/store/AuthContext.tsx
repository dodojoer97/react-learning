// React
import { createContext, useState, FC, Context } from "react";
import type { PropsWithChildren } from "react";

// DTO
import SignupDTO from "@/DTO/request/Signup";
import LoginDTO from "../DTO/request/Login";
import User from "@/models/User";

// Services
import AuthService from "@/services/AuthService";

// Interface
import { IAuthContext } from "./AuthContext.d";

// Utils
import isError from "@/utils/isError";

// Base context with default values
export const AuthContext: Context<IAuthContext> = createContext<IAuthContext>({
	signup: async () => undefined,
	login: async () => {},
	logout: async () => {},
	clearError: () => {},
	user: undefined,
	loading: false,
	error: null,
});

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
	// Service
	const authService = new AuthService();

	const [user, setUser] = useState<User | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Register the user
	const signup = async (dto: SignupDTO): Promise<void> => {
		try {
			setLoading(true);
			const user: User | undefined = await authService.signup(dto);
			setUser(user);
			setLoading(false);


		} catch (error) {
			if (isError(error)) {
				setError(error.message);
				return
			}
			setError("Something went wrong with signup");
		} finally {
			setLoading(false);
		}
	};

	// Login
	const login = async (dto: LoginDTO): Promise<void> => {
		try {
			setLoading(true);

			const user: User | undefined = await authService.login(dto);
			setUser(user);
			

			setLoading(false);
			clearError();

		} catch (error) {
			if (isError(error)) {
				console.log('error: ', error.message)
				setError(error.message);
				return
			}
			setError("Something went wrong with login");
		} finally {
			setLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			setLoading(true);

			authService.logout();

			setUser(undefined);
			setLoading(false);
		} catch (error) {
			if (isError(error)) {
				setError(error.message);
				return
			}
			setError("Something went wrong with logout");
		} finally {
			setLoading(false);
		}
	};

	const clearError = (): void => {
		setError(null)
	}

	const contextValue = {
		signup,
		login,
		logout,
		user,
		loading,
		error,
		clearError
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
