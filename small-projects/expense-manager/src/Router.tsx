// React router
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Routes
import Home from "@/routes/Home";
import Login from "@/routes/Login";
import Signup from "@/routes/Signup";

// Components
import NavigationGuard from "@/components/NavigationGuard"




const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<NavigationGuard><Home /></NavigationGuard>} />
			<Route path="/login" element={<NavigationGuard><Login /></NavigationGuard>} />
			<Route path="/signup" element={<NavigationGuard><Signup /></NavigationGuard>} />
		</>
	)
);

export default router;
