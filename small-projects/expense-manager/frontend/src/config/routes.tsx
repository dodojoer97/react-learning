import { NonIndexRouteObject } from "react-router-dom";
import { ReactNode, lazy, Suspense } from "react";
import { authLoader } from "@/loaders/authLoader";
import ErrorPage from "@/pages/Error";
import Layout from "@/components/UI/Layout";
import RightActions from "@/components/Dashboard/RightActions";
import CategoriesRightActions from "@/components/Category/RightActions";
import Loader from "@/components/UI/Loader"; // Add a fallback loading spinner
import { categoryLoader } from "@/loaders/categoryLoader";
import { Navigate } from "react-router-dom";

// Lazy-loaded components
const LoginPage = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/Signup"));
const Settings = lazy(() => import("@/pages/Settings"));
const Categories = lazy(() => import("@/pages/Categories"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Analytics = lazy(() => import("@/pages/Analytics"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const Account = lazy(() => import("@/pages/Account"));

export interface RouteConfig extends NonIndexRouteObject {
	title: string;
	path?: string;
	element: ReactNode;
	isProtected?: boolean;
	sidebarDisplay?: boolean;
	errorElement?: ReactNode;
	children?: RouteConfig[];
	index?: boolean;
}

export const routeConfig: RouteConfig[] = [
	{
		path: "/",
		element: <Navigate to="/dashboard" replace />,
		title: "",
	},
	{
		title: "Dashboard",
		element: (
			<Suspense fallback={<Loader />}>
				<Layout rightComponent={<RightActions />} />
			</Suspense>
		),
		sidebarDisplay: true,
		isProtected: true,
		errorElement: <ErrorPage />,
		loader: () => authLoader(),
		children: [
			{
				index: true, // Makes this the default for the parent "/"
				title: "Dashboard",
				path: "/dashboard",
				element: (
					<Suspense fallback={<Loader />}>
						<Dashboard />
					</Suspense>
				),
				isProtected: true,
				errorElement: <ErrorPage />,
				loader: () => {
					return { title: "Dashboard" };
				},
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
				errorElement: <ErrorPage />,
				loader: () => {
					return { title: "Dasboard" };
				},
			},
		],
	},
	{
		title: "Settings",
		path: "/settings",
		element: (
			<Suspense fallback={<Loader />}>
				<Layout rightComponent={<CategoriesRightActions />} />
			</Suspense>
		),
		sidebarDisplay: true,
		isProtected: true,
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
				loader: async () => {
					await authLoader();
					categoryLoader();
					return { title: "Preferences" };
				},
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
				loader: async () => {
					await authLoader();
					categoryLoader();
					return { title: "Categories" };
				},
				errorElement: <ErrorPage />,
			},
			{
				title: "Account",
				path: "/settings/account",
				element: (
					<Suspense fallback={<Loader />}>
						<Account />
					</Suspense>
				),
				isProtected: true,
				loader: async () => {
					await authLoader();
					categoryLoader();
					return { title: "Account" };
				},
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
				loader: ({ request }) => {
					const url = new URL(request.url);
					const token = url.searchParams.get("token");

					if (token) {
						return authLoader(token);
					}

					return null;
				},
				isProtected: false,
				errorElement: <ErrorPage />,
			},
		],
	},
];
