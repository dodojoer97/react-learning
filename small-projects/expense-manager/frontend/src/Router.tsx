// React router
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Routes
import { routeConfig } from "@/config/routes";

// Components
// import NavigationGuard from "@/components/NavigationGuard";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{routeConfig.map(({ path, component, isProtected }) => (
				<Route
					key={path}
					path={path}
					element={isProtected ? <PrivateRoute>{component}</PrivateRoute> : component}
				/>
			))}
		</>
	)
);

export default router;
