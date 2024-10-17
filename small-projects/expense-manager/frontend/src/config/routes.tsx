import { ReactNode, lazy } from "react";
import { authLoader } from "@/loaders/authLoader"; // Example loader for authentication
import ErrorPage from "@/pages/Error"; // Example error page

// Lazy-loaded routes for better performance
const LoginPage = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/Signup"));
const Settings = lazy(() => import("@/pages/Settings"));
const Categories = lazy(() => import("@/pages/Categories"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analytics = lazy(() => import("@/pages/Analytics"));

export interface RouteConfig {
	title: string;
	path: string;
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
		path: "/dashboard", // Absolute path for parent
		element: <Dashboard />,
		sidebarDisplay: true,
		isProtected: true,
		loader: authLoader, // Add loader for protected route
		errorElement: <ErrorPage />, // Error boundary
		children: [
			{
				title: "Main",
				path: "dashboard",
				element: <Dashboard />,
				isProtected: true,
				loader: authLoader,
				errorElement: <ErrorPage />,
			},
			{
				title: "Analytics",
				path: "analytics", // Relative to "/dashboard"
				element: <Analytics />,
				isProtected: true,
				loader: authLoader,
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		title: "Settings",
		path: "/settings", // Absolute path for parent
		element: <Settings />,
		sidebarDisplay: true,
		isProtected: true,
		loader: authLoader,
		errorElement: <ErrorPage />,
		children: [
			{
				title: "Preferences",
				path: "preferences", // Relative to "/settings"
				element: <Settings />,
				isProtected: true,
				loader: authLoader,
				errorElement: <ErrorPage />,
			},
			{
				title: "Categories",
				path: "categories", // Relative to "/settings"
				element: <Categories />,
				isProtected: true,
				loader: authLoader,
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
