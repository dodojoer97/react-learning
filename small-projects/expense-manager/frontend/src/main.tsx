// Translations
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
import "@/templates/mosaic/css/style.css";
import "@/templates/mosaic/charts/ChartjsConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
