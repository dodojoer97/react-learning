// React
import type { FC, PropsWithChildren } from "react";
import { useEffect, useContext, useMemo } from "react";

// Router
import { useLocation, useNavigate } from "react-router-dom";

// Store
import { AuthContext } from "@/store/AuthContext";

// Config
import { routeConfig, RouteConfig } from "@/config/routes";

// Create the set of protected routes once, outside the component to avoid recreating it on each render
const protectedRoutes: Set<string> = new Set(
    routeConfig.filter((route: RouteConfig) => route.protected).map((route: RouteConfig) => route.path)
);

const NavigationGuard: FC<PropsWithChildren> = ({ children }) => {
    const { user, clearError } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear any existing errors when the location changes
        clearError();

        // Redirect the user to the login page if not authenticated and trying to access a protected route
        if (!user && protectedRoutes.has(location.pathname)) {
            // Redirect to login page and pass the current location in the state so we can redirect back after login
            navigate('/login', { state: { from: location }, replace: true });
        }
    }, [user, location, navigate]);

    return <>{children}</>;
};

export default NavigationGuard;
