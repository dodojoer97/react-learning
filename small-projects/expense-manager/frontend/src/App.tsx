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
	return (
		<>
			<AuthContextProvider>
				<SettingsContextProvider>
					<RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
				</SettingsContextProvider>
			</AuthContextProvider>
		</>
	);
};

export default App;
