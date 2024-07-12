// React router
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Routes
import Home from "@/routes/Home";
import Login from "@/routes/Login";
import Signup from "@/routes/Signup";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
		</>
	)
);

export default router;
