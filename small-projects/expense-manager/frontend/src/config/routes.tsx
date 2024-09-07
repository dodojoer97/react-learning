// React
import { ReactNode } from "react";

// Routes
import Home from "@/pages/Home";
import LoginPage from "@/pages/Login";
import SignUp from "@/pages/Signup";
import Settings from "@/pages/Settings";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";

export interface RouteConfig {
	title: string;
	path: string;
	component: ReactNode;
	isProtected: boolean;
}

export interface RouteGroup {
	title: string;
	subRoutes: RouteConfig[];
	sidebarDisplay: boolean;
}

export const routeConfig: RouteGroup[] = [
	{
		title: "Home",
		sidebarDisplay: false,
		subRoutes: [{ title: "home", path: "/", component: <Home />, isProtected: false }],
	},
	{
		title: "Dashboard",
		sidebarDisplay: false,
		subRoutes: [
			{
				title: "Main",
				path: "/dashboard",
				component: <Dashboard />,
				isProtected: true,
			},
			{
				title: "Analytics",
				path: "/dashboard/analytics",
				component: <> </>,
				isProtected: true,
			},
		],
	},
	{
		title: "Settings",
		sidebarDisplay: true,
		subRoutes: [
			{
				title: "Preferences",
				path: "/settings",
				component: <Settings />,
				isProtected: true,
			},
			{
				title: "Categories",
				path: "/settings/categories",
				component: <Categories />,
				isProtected: true,
			},
		],
	},
	{
		title: "Auth",
		sidebarDisplay: false,
		subRoutes: [
			{
				title: "login",
				path: "/login",
				component: <LoginPage />,
				isProtected: false,
			},
			{
				title: "signup",
				path: "/signup",
				component: <SignUp />,
				isProtected: false,
			},
		],
	},
];
