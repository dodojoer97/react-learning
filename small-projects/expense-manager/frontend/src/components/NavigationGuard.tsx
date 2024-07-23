// React
import type { FC, PropsWithChildren } from "react";
import { useEffect, useContext, useMemo } from "react";

// Router
import { useLocation, useNavigate } from "react-router-dom";

// Store
import { AuthContext } from "@/store/AuthContext";

// Services
import AuthService from "@/services/AuthService";

// Config
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
	// Destructure authentication context values
	const { user, setUser, clearError, setLoading } = useContext(AuthContext);
	// Get the current location and navigate function from the router
	const location = useLocation();
	const navigate = useNavigate();

	// Memoize the instance of the authentication service to prevent re-creating it on each render
	const authService = useMemo(() => new AuthService(), []);

	useEffect(() => {
		const checkSession = async () => {
			setLoading(true); // Set loading state to true
			try {
				let verifiedUser: User | undefined;
				// Get the stored authentication token from local storage
				const storedToken = localStorage.getItem("authToken");

				if (storedToken) {
					// Verify the stored token
					verifiedUser = await authService.verifyToken();

					if (verifiedUser) {
						// If token is verified, update the user context
						setUser(verifiedUser);
					} else {
						// If token is invalid, throw an error
						throw new Error("Session invalid");
					}
				}

				// If no stored token or verification failed, handle navigation
				if (!storedToken || !verifiedUser) {
					if (protectedRoutes.has(location.pathname)) {
						// Redirect to login page and pass the current location in the state
						navigate("/login", { state: { from: location }, replace: true });
					}
				}
			} catch (error) {
				// Log any errors encountered during the session check
				console.error("Error verifying token:", error);
				// Handle error (e.g., show a notification to the user)
			} finally {
				// Set loading state back to false
				setLoading(false);
			}
		};

		// Check session if no user is authenticated
		if (!user) {
			checkSession();
		}
		// Clear any existing errors when the location changes
		clearError();
	}, [authService, location.pathname, navigate, user]);

	// Render children components
	return <>{children}</>;
};

export default NavigationGuard;
