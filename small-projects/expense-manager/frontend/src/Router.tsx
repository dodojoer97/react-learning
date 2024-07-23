// React router
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Routes
import {routeConfig} from "@/config/routes";

// Components
import NavigationGuard from "@/components/NavigationGuard"


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {routeConfig.map(({ path, component }) => (
                <Route key={path} path={path} element={
                    <NavigationGuard>
                        {component}
                    </NavigationGuard>
                } />
            ))}
        </>
    )
);

export default router;
