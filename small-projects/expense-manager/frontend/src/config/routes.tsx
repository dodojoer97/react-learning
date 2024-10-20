import { ReactNode, lazy, Suspense } from "react";
import { authLoader } from "@/loaders/authLoader";
import ErrorPage from "@/pages/Error";
import Layout from "@/components/UI/Layout";
import RightActions from "@/components/Dashboard/RightActions";
import Loader from "@/components/UI/Loader"; // Add a fallback loading spinner

// Lazy-loaded components
const LoginPage = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/Signup"));
const Settings = lazy(() => import("@/pages/Settings"));
const Categories = lazy(() => import("@/pages/Categories"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

export interface RouteConfig {
	title: string;
	path?: string;
	element: ReactNode;
	isProtected?: boolean;
	sidebarDisplay?: boolean;
	loader?: () => Promise<any>;
	errorElement?: ReactNode;
	children?: RouteConfig[];
	index?: boolean;
}

export const routeConfig: RouteConfig[] = [
	{
		title: "Dashboard",
		path: "/",
		element: (
			<Suspense fallback={<Loader />}>
				<Layout rightComponent={<RightActions />} />
			</Suspense>
		),
		sidebarDisplay: true,
		isProtected: true,
		loader: () => authLoader({ title: "Dashboard" }),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				title: "Main",
				path: "/dashboard",
				element: (
					<Suspense fallback={<Loader />}>
						<Dashboard />
					</Suspense>
				),
				isProtected: true,
				loader: () => authLoader({ title: "Dashboard" }),
				errorElement: <ErrorPage />,
			},
			{
				title: "Analytics",
				path: "/dashboard/analytics",
				element: (
					<Suspense fallback={<Loader />}>
						<Analytics />
					</Suspense>
				),
				isProtected: true,
				loader: () => authLoader({ title: "Analytics" }),
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		title: "Settings",
		path: "/settings",
		element: (
			<Suspense fallback={<Loader />}>
				<Layout />
			</Suspense>
		),
		sidebarDisplay: true,
		isProtected: true,
		loader: () => authLoader({ title: "Settings" }),
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				title: "Preferences",
				path: "/settings/preferences",
				element: (
					<Suspense fallback={<Loader />}>
						<Settings />
					</Suspense>
				),
				isProtected: true,
				loader: () => authLoader({ title: "Preferences" }),
				errorElement: <ErrorPage />,
			},
			{
				title: "Categories",
				path: "/settings/categories",
				element: (
					<Suspense fallback={<Loader />}>
						<Categories />
					</Suspense>
				),
				isProtected: true,
				loader: () => authLoader({ title: "Categories" }),
				errorElement: <ErrorPage />,
			},
		],
	},
	{
		title: "Auth",
		path: "auth",
		element: null,
		sidebarDisplay: false,
		children: [
			{
				title: "Login",
				path: "login",
				element: (
					<Suspense fallback={<Loader />}>
						<LoginPage />
					</Suspense>
				),
				isProtected: false,
				errorElement: <ErrorPage />,
			},
			{
				title: "Signup",
				path: "signup",
				element: (
					<Suspense fallback={<Loader />}>
						<SignUp />
					</Suspense>
				),
				isProtected: false,
				errorElement: <ErrorPage />,
			},
			{
				title: "reset-password",
				path: "reset-password",
				element: (
					<Suspense fallback={<Loader />}>
						<ResetPassword />
					</Suspense>
				),
				isProtected: false,
				errorElement: <ErrorPage />,
			},
		],
	},
];
