// React
import React from "react";
import ReactDOM from "react-dom/client";

// Css
import App from "./App.tsx";

import "./index.css";

// TODO add a file for this to abstract, add global types on window
import AuthService from "./services/AuthService.ts";

// @ts-ignore
window.authService = new AuthService();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
