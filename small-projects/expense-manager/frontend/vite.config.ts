import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@/": `${path.resolve(__dirname, "src")}/`,
			"@common": `${path.resolve(__dirname, "../common")}/`,
			"@tailwindConfig": path.resolve(__dirname, "tailwind.config.js"),
		},
	},
	optimizeDeps: {
		include: ["@tailwindConfig"],
	},
});
