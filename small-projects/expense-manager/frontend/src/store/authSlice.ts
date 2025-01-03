import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AuthService from "@/services/AuthService";
import RegisterDTO from "@/DTO/request/Register";
import LoginDTO from "@/DTO/request/Login";
import User from "@/models/User";
import ResetPasswordEmailDTO from "@/DTO/request/ResetPasswordEmail";

// Define the AuthState interface
export interface AuthState {
	user: User | undefined;
	loading: boolean;
	isAuthenticated: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: undefined,
	loading: false,
	isAuthenticated: true,
	error: null,
};

// Initialize the AuthService
const authService = new AuthService();

// Thunks for async operations with proper types
export const signup = createAsyncThunk<User | undefined, RegisterDTO, { rejectValue: string }>(
	"auth/signup",
	async (dto: RegisterDTO, { rejectWithValue }) => {
		try {
			const user = await authService.register(dto);
			return user;
		} catch (error: any) {
			return rejectWithValue(error.message || "Something went wrong with signup");
		}
	}
);

export const login = createAsyncThunk<User | undefined, LoginDTO, { rejectValue: string }>(
	"auth/login",
	async (dto: LoginDTO, { rejectWithValue }) => {
		try {
			const user = await authService.login(dto);
			return user;
		} catch (error: any) {
			return rejectWithValue(error.message || "Something went wrong with login");
		}
	}
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
	"auth/logout",
	async (_, { rejectWithValue }) => {
		try {
			await authService.logout();
		} catch (error: any) {
			return rejectWithValue(error.message || "Something went wrong with logout");
		}
	}
);

export const initializeAuth = createAsyncThunk<
	User | undefined,
	string | null,
	{ rejectValue: string }
>("auth/initializeAuth", async (token, { rejectWithValue }) => {
	try {
		// Pass token to verifyToken if provided, otherwise proceed without it
		const user = authService.verifyToken(token);
		return user;
	} catch (error: any) {
		return rejectWithValue(error.message || "Something went wrong with token verification");
	}
});

export const sendResetPasswordEmail = createAsyncThunk<
	void,
	ResetPasswordEmailDTO,
	{ rejectValue: string }
>("auth/sendResetPasswordEmail", async (dto: ResetPasswordEmailDTO, { rejectWithValue }) => {
	try {
		await authService.sendResetPasswordEmail(dto);
	} catch (error: any) {
		return rejectWithValue(error.message || "Something went wrong with sendResetPassword");
	}
});

export const resetPassword = createAsyncThunk<
	void,
	{ password: string; token: string },
	{ rejectValue: string }
>("auth/resetPassword", async (dto: { password: string; token: string }, { rejectWithValue }) => {
	try {
		await authService.resetPassword(dto.password, dto.token);
	} catch (error: any) {
		return rejectWithValue(error.message || "Something went wrong with sendResetPassword");
	}
});

export const updateUserInfo = createAsyncThunk<
	void,
	Omit<User, "password" | "uid">,
	{ rejectValue: string }
>("auth/updateUserInfo", async (userInfo: Omit<User, "password" | "uid">, { rejectWithValue }) => {
	try {
		await authService.updateUserInfo(userInfo);
	} catch (error: any) {
		return rejectWithValue(error.message || "Something went wrong with sendResetPassword");
	}
});

export const getUserInfo = createAsyncThunk<User, string, { rejectValue: string }>(
	"auth/getUserInfo",
	async (userId: string, { rejectWithValue }) => {
		try {
			const user = await authService.getUserInfo(userId);
			return user;
		} catch (error: any) {
			return rejectWithValue(error.message || "Something went wrong with sendResetPassword");
		}
	}
);

// Create the auth slice
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		setUser: (state, action: PayloadAction<User | undefined>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
		},
	},
	extraReducers: (builder) => {
		// Handle signup lifecycle
		builder.addCase(signup.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(initializeAuth.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(signup.fulfilled, (state, action: PayloadAction<User | undefined>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(signup.rejected, (state, action) => {
			state.error = action.payload || "Signup failed";
			state.loading = false;
		});

		// Handle login lifecycle
		builder.addCase(login.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action: PayloadAction<User | undefined>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = action.payload || "login failed";
			state.loading = false;
		});
		builder.addCase(getUserInfo.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isAuthenticated = !!action.payload;
			state.loading = false;
			state.error = null;
		});
		builder.addCase(getUserInfo.rejected, (state, action) => {
			state.error = action.payload || "getUserInfo failed";
			state.loading = false;
		});
		builder.addCase(sendResetPasswordEmail.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(sendResetPasswordEmail.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
		});
		builder.addCase(sendResetPasswordEmail.rejected, (state, action) => {
			state.error = "sendResetPasswordEmail failed";
			state.loading = false;
		});
		builder.addCase(resetPassword.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(resetPassword.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.error = "resetPassword failed";
			state.loading = false;
		});
		builder.addCase(updateUserInfo.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(updateUserInfo.fulfilled, (state, action) => {
			state.user = { uid: state.user.uid, ...action.meta.arg };
			state.loading = false;
			state.error = null;
		});
		builder.addCase(updateUserInfo.rejected, (state, action) => {
			state.error = "updateUserInfo failed";
			state.loading = false;
		});
		// Handle logout lifecycle
		builder.addCase(logout.fulfilled, (state) => {
			state.user = undefined;
			state.isAuthenticated = false;
			state.loading = false;
			state.error = null;
		});

		// Handle initialization
		builder.addCase(
			initializeAuth.fulfilled,
			(state, action: PayloadAction<User | undefined>) => {
				state.user = action.payload;
				state.isAuthenticated = !!action.payload;
				state.loading = false;
			}
		);
		builder.addCase(initializeAuth.rejected, (state, action) => {
			state.error = action.payload || "Initialization failed";
			state.loading = false;
		});
	},
});

// Export actions and reducer
export const { clearError, setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
