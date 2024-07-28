// React
import type { FC, PropsWithChildren } from "react";
import { useContext } from "react";

// Store
import { AuthContext } from "@/store/AuthContext";

// Router
import { Navigate } from "react-router-dom";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated } = useContext(AuthContext);
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
