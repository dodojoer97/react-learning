import { FC, PropsWithChildren, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState, AppDispatch } from "@/store/store";
import { initializeAuth } from "@/store/authSlice";

const PrivateRoute: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useDispatch<AppDispatch>();
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	// Dispatch initializeAuth on component mount
	useEffect(() => {
		dispatch(initializeAuth());
	}, [dispatch]);

	// Only render children if authenticated, otherwise redirect
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
