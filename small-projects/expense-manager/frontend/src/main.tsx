// i18n
import "./i18n";

// React
import React from "react";
import ReactDOM from "react-dom/client";

import { Logger } from "@common";

// APP
import App from "./App.tsx";

// CSS
import "./index.css";

// MOSAIC
import "@/css/style.css";
import "@/config/ChartjsConfig.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
