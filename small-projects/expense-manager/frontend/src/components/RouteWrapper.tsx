// components/RouteWrapper.tsx
import React, { ReactNode } from "react";
import AuthContextProvider from "@/store/AuthContext";
import SettingsContextProvider from "@/store/SettingsContext";
import TransactionContextProvider from "@/store/TransactionContext";

interface RouteWrapperProps {
	children: ReactNode;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => (
	<AuthContextProvider>
		<TransactionContextProvider>
			<SettingsContextProvider>{children}</SettingsContextProvider>
		</TransactionContextProvider>
	</AuthContextProvider>
);

export default RouteWrapper;
