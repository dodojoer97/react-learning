// React
import type { FC, PropsWithChildren } from "react";
import { useContext } from "react";

// Store
import { AuthContext } from "@/store/AuthContext";

// Router
import { Navigate } from "react-router-dom";

// Components
import Layout from "@/components/UI/Layout";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, loading } = useContext(AuthContext);

	if (loading) {
		return <Layout />;
	}

	return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
