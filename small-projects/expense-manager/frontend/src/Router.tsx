// Imports as before
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RouteWrapper from "./components/RouteWrapper";
import PrivateRoute from "./components/PrivateRoute";
import { routeConfig, RouteConfig, RouteGroup } from "@/config/routes";

// routes without grouping
const routes: RouteConfig[] = routeConfig.flatMap((group: RouteGroup) => {
	return group.subRoutes;
});
const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{routes.map(({ path, component: Component, isProtected }) => (
				<Route
					key={path}
					path={path}
					element={
						<RouteWrapper>
							{isProtected ? (
								<PrivateRoute>{Component}</PrivateRoute>
							) : (
								<>{Component}</>
							)}
						</RouteWrapper>
					}
				/>
			))}
		</>
	)
);

export default router;
