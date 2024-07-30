// components/RouteWrapper.tsx
import React, { ReactNode } from "react";
import AuthContextProvider from "@/store/AuthContext";
import SettingsContextProvider from "@/store/SettingsContext";

interface RouteWrapperProps {
	children: ReactNode;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => (
	<AuthContextProvider>
		<SettingsContextProvider>{children}</SettingsContextProvider>
	</AuthContextProvider>
);

export default RouteWrapper;
