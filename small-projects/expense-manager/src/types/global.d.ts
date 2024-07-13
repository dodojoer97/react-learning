// Services
import AuthService from "@/services/AuthService";

declare global {
	interface Window {
		authService: AuthService;
	}
}

export {};
