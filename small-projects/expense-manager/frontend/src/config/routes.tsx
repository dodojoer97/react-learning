// React
import { ReactNode } from "react";

// Routes
import LoginPage from "@/pages/Login";
import HomePage from "@/pages/Home";
import SignUp from "@/pages/Signup";
import Settings from "@/pages/Settings";
import Categories from "@/pages/Categories";

// Define the interface for a route configuration
export interface RouteConfig {
	path: string;
	component: ReactNode;
	protected: boolean;
}

// Create the route configuration array
export const routeConfig: RouteConfig[] = [
	{
		path: "/login",
		component: <LoginPage />,
		protected: false,
	},
	{
		path: "/",
		component: <HomePage />,
		protected: false,
	},
	{
		path: "/signup",
		component: <SignUp />,
		protected: false,
	},
	{
		path: "/settings",
		component: <Settings />,
		protected: true,
	},
	{
		path: "/settings/categories",
		component: <Categories />,
		protected: true,
	},
];
