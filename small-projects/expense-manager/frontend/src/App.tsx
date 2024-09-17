// React
import { FC } from "react";

// React router
import { RouterProvider } from "react-router-dom";

// Redux
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "@/store/store"; // Import the Redux store

// Router
import router from "./Router";

const App: FC = () => {
	return (
		<Provider store={store}>
			<RouterProvider
				router={router}
				fallbackElement={<p>Initial Load...</p>}
			></RouterProvider>
		</Provider>
	);
};

export default App;
