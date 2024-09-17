// React
import type { FC, PropsWithChildren } from "react";

// Redux
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; // Import the store

// Router
import { Navigate } from "react-router-dom";

// Components
import Layout from "@/components/UI/Layout";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	// Get authentication state from Redux store
	const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

	if (loading) {
		return <Layout />; // You can add a loading spinner here if needed
	}

	// If the user is authenticated, render the children; otherwise, redirect to login
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
