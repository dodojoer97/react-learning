// React imports
import type { FC, PropsWithChildren } from "react";
import { useEffect, useContext, useMemo } from "react";

// Router imports
import { useLocation, useNavigate } from "react-router-dom";

// Store import for authentication context
import { AuthContext } from "@/store/AuthContext";

// Services import for authentication service
import AuthService from "@/services/AuthService";

// Config import for route configuration
import { routeConfig, RouteConfig } from "@/config/routes";

// Models
import User from "@/models/User";

// Create the set of protected routes once, outside the component to avoid recreating it on each render
const protectedRoutes: Set<string> = new Set(
	routeConfig
		.filter((route: RouteConfig) => route.protected)
		.map((route: RouteConfig) => route.path)
);

const NavigationGuard: FC<PropsWithChildren> = ({ children }) => {
	const { user, setUser, clearError, setLoading } = useContext(AuthContext);
	const location = useLocation();
	const navigate = useNavigate();

	const authService = useMemo(() => new AuthService(), []);

	useEffect(() => {
		const checkSession = async () => {
			console.log("check 1");

			setLoading(true);
			try {
				let verifiedUser: User | undefined;
				const storedToken = localStorage.getItem("authToken");

				if (storedToken) {
					verifiedUser = await authService.verifyToken();

					if (verifiedUser) {
						setUser(verifiedUser);
					} else {
						throw new Error("Session invalid");
					}
				}

				if (!storedToken || !verifiedUser) {
					if (protectedRoutes.has(location.pathname)) {
						navigate("/login", { state: { from: location }, replace: true });
					}
				}
			} catch (error) {
				console.error("Error verifying token:", error);
				// Handle error (e.g., show a notification to the user)
			} finally {
				setLoading(false);
			}
		};

		checkSession();
		clearError();
	}, [authService, location.pathname, navigate]);

	return <>{children}</>;
};

export default NavigationGuard;
