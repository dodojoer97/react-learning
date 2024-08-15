// React
import { ReactNode } from "react";

// Routes
import LoginPage from "@/pages/Login";
import HomePage from "@/pages/Home";
import SignUp from "@/pages/Signup";
import Settings from "@/pages/Settings";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";

// Define the interface for a route configuration
export interface RouteConfig {
	path: string;
	component: ReactNode;
	isProtected: boolean;
}

// Create the route configuration array
export const routeConfig: RouteConfig[] = [
	{
		path: "/login",
		component: <LoginPage />,
		isProtected: false,
	},
	{
		path: "/",
		component: <HomePage />,
		isProtected: false,
	},
	{
		path: "/signup",
		component: <SignUp />,
		isProtected: false,
	},
	{
		path: "/settings",
		component: <Settings />,
		isProtected: true,
	},
	{
		path: "/settings/categories",
		component: <Categories />,
		isProtected: true,
	},
	{
		path: "/dashboard",
		component: <Dashboard />,
		isProtected: true,
	},
];
