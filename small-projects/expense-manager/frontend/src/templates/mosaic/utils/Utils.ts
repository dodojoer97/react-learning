import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigFile from "@tailwindConfig"; // Adjust the path as needed
import { Config } from "tailwindcss"; // Tailwind config type

// Tailwind configuration function
export const tailwindConfig = (): Config => {
	// @ts-ignore
	return resolveConfig(tailwindConfigFile);
};

// Convert hex color to RGB
export const hexToRGB = (h: string): string => {
	let r = 0;
	let g = 0;
	let b = 0;
	if (h.length === 4) {
		r = parseInt(`${h[1]}${h[1]}`, 16);
		g = parseInt(`${h[2]}${h[2]}`, 16);
		b = parseInt(`${h[3]}${h[3]}`, 16);
	} else if (h.length === 7) {
		r = parseInt(`${h[1]}${h[2]}`, 16);
		g = parseInt(`${h[3]}${h[4]}`, 16);
		b = parseInt(`${h[5]}${h[6]}`, 16);
	}
	return `${r},${g},${b}`;
};

// Format value as currency
export const formatValue = (value: number): string => {
	return Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumSignificantDigits: 3,
		notation: "compact",
	}).format(value);
};

// Format value with thousands separator
export const formatThousands = (value: number): string => {
	return Intl.NumberFormat("en-US", {
		maximumSignificantDigits: 3,
		notation: "compact",
	}).format(value);
};
