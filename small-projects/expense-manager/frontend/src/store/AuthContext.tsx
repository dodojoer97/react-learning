// React
import { createContext, useState, FC, Context, useCallback, useEffect } from "react";
import type { PropsWithChildren } from "react";

// DTO
import RegisterDTO from "@/DTO/request/Register";
import LoginDTO from "../DTO/request/Login";
import User from "@/models/User";

// Services
import AuthService from "@/services/AuthService";

// Interface
import { IAuthContext } from "./AuthContext.d";

// Utils
import { isError } from "@common";

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
	isAuthenticated: false,
});

const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
	// Service
	const authService = new AuthService();

	const [user, setUser] = useState<User | undefined>(undefined);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const initializeAuth = async () => {
		try {
			setLoading(true);
			const currentUser = await authService.verifyToken();
			if (currentUser) {
				setUser(currentUser);
				setIsAuthenticated(true);
			}

			setLoading(false);
		} catch (error) {
			if (isError(error)) {
				setError(JSON.parse(error.message).message);
				return;
			}
			setError("Something went wrong with signup");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		initializeAuth();
	}, []);

	// Register the user
	const signup = async (dto: RegisterDTO): Promise<void> => {
		try {
			setLoading(true);
			const user: User | undefined = await authService.register(dto);
			setUser(user);
			setLoading(false);
		} catch (error) {
			if (isError(error)) {
				setError(JSON.parse(error.message).message);
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
			setIsAuthenticated(true);

			setLoading(false);
			clearError();
		} catch (error) {
			if (isError(error)) {
				setError(JSON.parse(error.message).message);
				return;
			}
			setError("Something went wrong with login");
		} finally {
			setLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			await authService.logout();
			setLoading(true);

			setUser(undefined);
			setIsAuthenticated(false);

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

	const clearError = useCallback((): void => {
		setError(null);
	}, []);

	const handleSetLoading = useCallback((loading: boolean): void => {
		setLoading(loading);
	}, []);

	const handleSetUser = useCallback((user: User): void => {
		setUser(user);
	}, []);

	const contextValue: IAuthContext = {
		signup,
		login,
		logout,
		setLoading: handleSetLoading,
		setUser: handleSetUser,
		clearError,
		loading,
		error,
		user,
		isAuthenticated,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
