// Imports as before
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import RouteWrapper from "./components/RouteWrapper";
import PrivateRoute from "./components/PrivateRoute";
import { routeConfig } from "@/config/routes";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			{routeConfig.map(({ path, component: Component, isProtected }) => (
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
