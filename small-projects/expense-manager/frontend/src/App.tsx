// React
import { FC } from "react";

// React router
import { RouterProvider } from "react-router-dom";

// Router
import router from "./Router";

// Context
import AuthContextProvider from "@/store/AuthContext";
import SettingsContextProvider from "@/store/SettingsContext";

const App: FC = () => {
	console.log("app render");
	return (
		<>
			<RouterProvider router={router}>
				<AuthContextProvider>
					<SettingsContextProvider></SettingsContextProvider>
				</AuthContextProvider>
			</RouterProvider>
		</>
	);
};

export default App;
