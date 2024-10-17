import { ReactNode, lazy } from "react";
import { authLoader } from "@/loaders/authLoader"; // Example loader for authentication
import ErrorPage from "@/pages/Error"; // Example error page

// components
import Layout from "@/components/UI/Layout";
import RightActions from "@/components/Dashboard/RightActions";

// Lazy-loaded routes for better performance
const LoginPage = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/Signup"));
const Settings = lazy(() => import("@/pages/Settings"));
const Categories = lazy(() => import("@/pages/Categories"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analytics = lazy(() => import("@/pages/Analytics"));

export interface RouteConfig {
	title: string;
	path?: string;
	element: ReactNode; // Updated to reflect React Router's expected 'element'
	isProtected?: boolean;
	sidebarDisplay?: boolean;
	loader?: () => Promise<any>; // Loader for data fetching
	errorElement?: ReactNode; // Error boundary component
	children?: RouteConfig[];
	index?: boolean;
}

export const routeConfig: RouteConfig[] = [
	{
		title: "Dashboard",
		path: "dashboard", // Absolute path for parent
		element: <Layout rightComponent={<RightActions />} />,
		sidebarDisplay: true,
		isProtected: true,
		loader: () => authLoader({ title: "Dashboard" }), // Pass the title to the loader
		errorElement: <ErrorPage />, // Error boundary
		children: [
			{
				index: true,
				title: "Main",
				path: "/dashboard",
				element: <Dashboard />,
				isProtected: true,
				loader: () => authLoader({ title: "Dashboard" }), // Pass the title to the loader
				errorElement: <ErrorPage />,
			},
			{
				title: "Analytics",
				path: "/dashboard/analytics", // Relative to "/dashboard"
				element: <Analytics />,
				isProtected: true,
				loader: () => authLoader({ title: "Analytics" }), // Pass the title to the loader
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		title: "Settings",
		path: "/settings", // Absolute path for parent
		element: <Layout />,
		sidebarDisplay: true,
		isProtected: true,
		loader: () => authLoader({ title: "Settings" }), // Pass the title to the loader
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				title: "Preferences",
				path: "/settings/preferences", // Relative to "/settings"
				element: <Settings />,
				isProtected: true,
				loader: () => authLoader({ title: "Preferences" }), // Pass the title to the loader
				errorElement: <ErrorPage />,
			},
			{
				title: "Categories",
				path: "/settings/categories", // Relative to "/settings"
				element: <Categories />,
				isProtected: true,
				loader: () => authLoader({ title: "Categories" }), // Pass the title to the loader
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		title: "Auth",
		path: "auth", // Base path for Auth section
		element: null, // No direct element for the base "Auth" route
		sidebarDisplay: false,

		children: [
			{
				title: "Login",
				path: "login", // Relative to "auth"
				element: <LoginPage />,
				isProtected: false,
				errorElement: <ErrorPage />,
			},
			{
				title: "Signup",
				path: "signup", // Relative to "auth"
				element: <SignUp />,
				isProtected: false,
				errorElement: <ErrorPage />,
			},
		],
	},
];
