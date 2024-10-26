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
	string | undefined,
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

export const sendResetPassword = createAsyncThunk<
	void,
	ResetPasswordEmailDTO,
	{ rejectValue: string }
>("auth/sendResetPassword", async (dto: ResetPasswordEmailDTO, { rejectWithValue }) => {
	try {
		await authService.sendResetPassword(dto);
	} catch (error: any) {
		return rejectWithValue(error.message || "Something went wrong with sendResetPassword");
	}
});

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
			state.error = action.payload || "sendResetPassword failed";
			state.loading = false;
		});
		builder.addCase(sendResetPassword.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(sendResetPassword.fulfilled, (state) => {
			state.loading = false;
			state.error = null;
		});
		builder.addCase(sendResetPassword.rejected, (state, action) => {
			state.error = "sendResetPassword failed";
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
