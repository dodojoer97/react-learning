// components/RouteWrapper.tsx
import React, { ReactNode } from "react";
import AuthContextProvider from "@/store/AuthContext";
import SettingsContextProvider from "@/store/SettingsContext";
import TransactionContextProvider from "@/store/TransactionContext";
import OpenContextProvider from "@/store/OpenContext";

// MOSAIC
import ThemeProvider from "@/templates/mosaic/utils/ThemeContext";

interface RouteWrapperProps {
	children: ReactNode;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => (
	<AuthContextProvider>
		<ThemeProvider>
			<SettingsContextProvider>
				<TransactionContextProvider>
					<OpenContextProvider>{children}</OpenContextProvider>
				</TransactionContextProvider>
			</SettingsContextProvider>
		</ThemeProvider>
	</AuthContextProvider>
);

export default RouteWrapper;
