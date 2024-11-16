// i18n
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation modules
import { translations } from "./locales/en/translations";

// Resources object
const resources = {
	en: translations,
};

i18n.use(initReactI18next) // Passes i18n instance to react-i18next
	.init({
		resources,
		lng: "en", // Default language
		fallbackLng: "en", // Fallback language if the selected language is unavailable
		ns: Object.keys(translations), // Dynamically use all keys in translations as namespaces
		defaultNS: "home", // Set a default namespace if needed
		interpolation: {
			escapeValue: false, // React already handles XSS protection
		},
	});

export default i18n;
