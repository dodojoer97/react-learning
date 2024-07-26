// React
import { createContext, useState, FC, Context, useEffect } from "react";
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
	setLoading: () => {},
	setUser: () => {},
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
				return;
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
				setError(error.message);
				return;
			}
			setError("Something went wrong with login");
		} finally {
			setLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			setLoading(true);

			await authService.logout();

			setUser(undefined);
			setLoading(false);
		} catch (error) {
			if (isError(error)) {
				setError(error.message);
				return;
			}
			setError("Something went wrong with logout");
		} finally {
			setLoading(false);
		}
	};

	// Verify token
	const verifyToken = async (): Promise<void> => {
		try {
			setLoading(true);
			const user = await authService.verifyToken();
			setUser(user);
		} catch (error) {
			setUser(undefined);
		} finally {
			setLoading(false);
		}
	};

	const clearError = (): void => {
		setError(null);
	};

	const handleSetLoading = (loading: boolean): void => {
		setLoading(loading);
	};

	const handleSetUser = (user: User): void => {
		setUser(user);
	};

	// Verify token on load
	useEffect(() => {
		verifyToken();
	}, []);

	const contextValue = {
		signup,
		login,
		logout,
		setLoading: handleSetLoading,
		setUser: handleSetUser,
		clearError,
		user,
		loading,
		error,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
