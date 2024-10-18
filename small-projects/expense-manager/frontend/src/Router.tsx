import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routeConfig } from "@/config/routes";
import LoadingSpinner from "@/components/UI/Loader"; // Add a fallback loader component

const router = createBrowserRouter(routeConfig);

const Router = () => {
	return (
		<Suspense fallback={<LoadingSpinner />}>
			<RouterProvider router={router} />
		</Suspense>
	);
};

export default Router;
