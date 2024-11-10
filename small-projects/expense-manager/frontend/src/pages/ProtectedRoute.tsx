// ProtectedRoute.tsx
import { useEffect, useState, ReactNode } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authLoader } from "@/loaders/authLoader";
import { settingsLoader } from "@/loaders/settingsLoader";
import Loader from "@/components/UI/Loader";

// Define the types for the props
interface ProtectedRouteProps {
	title: string;
	children?: ReactNode;
	redirectTo?: string;
}

// Component definition
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	title,
	children,
	redirectTo = "/auth/login",
}) => {
	const url = new URL(window.location.href);
	const token = url.searchParams.get("token");

	// State
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [authLoaderData, setAuthLoaderData] = useState<{ title: string } | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const authResult: { title: string } | null = await authLoader({ title, token });
				await settingsLoader();
				setAuthLoaderData(authResult);
			} catch (error) {
				console.error("Loader error:", error);
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, []);

	if (isLoading) return <Loader />;

	if (!authLoaderData) {
		return <Navigate to={redirectTo} replace />;
	}

	return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
