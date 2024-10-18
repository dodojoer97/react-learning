// React
import { FC } from "react";

// React router
import { RouterProvider } from "react-router-dom";

// Redux
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "@/store/store"; // Import the Redux store

// Router
import Router from "./Router";

// Theme provider
import ThemeProvider from "./templates/mosaic/utils/ThemeContext";

const App: FC = () => {
	return (
		<Provider store={store}>
			<ThemeProvider>
				<Router />
			</ThemeProvider>
		</Provider>
	);
};

export default App;
