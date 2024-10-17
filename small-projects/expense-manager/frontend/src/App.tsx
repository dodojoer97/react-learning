// React
import { FC } from "react";

// React router
import { RouterProvider } from "react-router-dom";

// Redux
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "@/store/store"; // Import the Redux store

// Router
import router from "./Router";

// Theme provider
import ThemeProvider from "./templates/mosaic/utils/ThemeContext";

const App: FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<RouterProvider router={router} fallbackElement={<></>}></RouterProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
