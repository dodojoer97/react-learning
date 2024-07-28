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

// Create the set of protected routes once, outside the component to avoid recreating it on each render
const protectedRoutes: Set<string> = new Set(
	routeConfig
		.filter((route: RouteConfig) => route.protected)
		.map((route: RouteConfig) => route.path)
);

const NavigationGuard: FC<PropsWithChildren> = ({ children }) => {
	console.log("NavigationGuard render");
	// Destructure authentication context values
	const { clearError, verifyToken, user } = useContext(AuthContext);

	// Get the current location and navigate function from the router
	const location = useLocation();
	const navigate = useNavigate();

	// Check protected routes for logged in users
	useEffect(() => {
		// Clear auth error on route change
		clearError();

		const handleVerifyToken = async (): Promise<void> => {
			const user = await verifyToken();

			if (protectedRoutes.has(location.pathname) && !user) {
				navigate("/login", { state: { from: location }, replace: true });
			}
		};

		handleVerifyToken();

		// Clear any existing errors when the location changes
	}, [location.pathname]);

	useEffect(() => {
		console.log("user updated");
	}, [user]);

	// Render children components
	return <>{children}</>;
};

export default NavigationGuard;
