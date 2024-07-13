// React
import type { FC } from "react";

// React router
import { RouterProvider } from "react-router-dom";

// Router
import router from "./Router";

// Context
import AuthContextProvider from "@/store/AuthContext";

const App: FC = () => {
	return (
		<>
			<AuthContextProvider>
				<RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
			</AuthContextProvider>
		</>
	);
};

export default App;
