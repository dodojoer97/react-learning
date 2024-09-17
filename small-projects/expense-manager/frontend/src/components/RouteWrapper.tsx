// React
import React, { ReactNode } from "react";

// MOSAIC
import ThemeProvider from "@/templates/mosaic/utils/ThemeContext";

interface RouteWrapperProps {
	children: ReactNode;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({ children }) => (
	<ThemeProvider>{children}</ThemeProvider>
);

export default RouteWrapper;
