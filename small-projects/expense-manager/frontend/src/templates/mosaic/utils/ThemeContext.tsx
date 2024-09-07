import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context value
interface ThemeContextType {
	currentTheme: string;
	changeCurrentTheme: (newTheme: string) => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
	currentTheme: "light",
	changeCurrentTheme: () => {},
});

// Define the props type for the ThemeProvider component
interface ThemeProviderProps {
	children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
	const persistedTheme = localStorage.getItem("theme");
	const [theme, setTheme] = useState<string>(persistedTheme || "light");

	const changeCurrentTheme = (newTheme: string) => {
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
	};

	useEffect(() => {
		document.documentElement.classList.add("[&_*]:!transition-none");
		if (theme === "light") {
			document.documentElement.classList.remove("dark");
			document.documentElement.style.colorScheme = "light";
		} else {
			document.documentElement.classList.add("dark");
			document.documentElement.style.colorScheme = "dark";
		}

		const transitionTimeout = setTimeout(() => {
			document.documentElement.classList.remove("[&_*]:!transition-none");
		}, 1);

		return () => clearTimeout(transitionTimeout);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ currentTheme: theme, changeCurrentTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

// Custom hook to use the theme provider
export const useThemeProvider = () => useContext(ThemeContext);
