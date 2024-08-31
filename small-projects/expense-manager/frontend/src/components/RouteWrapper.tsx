// components/RouteWrapper.tsx
import React, { ReactNode } from "react";
import AuthContextProvider from "@/store/AuthContext";
import SettingsContextProvider from "@/store/SettingsContext";
import TransactionContextProvider from "@/store/TransactionContext";
import OpenContextProvider from "@/store/OpenContext";

interface RouteWrapperProps {
	children: ReactNode;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => (
	<AuthContextProvider>
		<SettingsContextProvider>
			<TransactionContextProvider>
				<OpenContextProvider>{children}</OpenContextProvider>
			</TransactionContextProvider>
		</SettingsContextProvider>
	</AuthContextProvider>
);

export default RouteWrapper;
