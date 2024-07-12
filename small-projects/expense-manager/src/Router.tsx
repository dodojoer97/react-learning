// React router
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

// Routes
import Home from "@/routes/Home";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<div>login</div>} />
			<Route path="/signup" element={<div>signup</div>} />
		</>
	)
);

export default router;
