// React
import type { FC } from "react";

// React router
import { RouterProvider } from "react-router-dom";

// Router
import router from "./Router";

const App: FC = () => {
	return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
};

export default App;
