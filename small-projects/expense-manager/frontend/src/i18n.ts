// i18n
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Types
import { ILocaleTranslations } from "@/locales/translation.d";

// Translation objects
import {
	homeTranslations,
	loginTranslations,
	signupTranslations,
	formsTranslations,
	headerTranslations,
	settingsTranslations,
	errorTranslations,
} from "./locales/en/translations";

const resources: ILocaleTranslations = {
	en: {
		home: homeTranslations,
		login: loginTranslations,
		signup: signupTranslations,
		forms: formsTranslations,
		header: headerTranslations,
		settings: settingsTranslations,
		errors: errorTranslations,
	},
};

i18n.use(initReactI18next) // passes i18n instance to react-i18next
	.init({
		resources,
		lng: "en", // language to use
		fallbackLng: "en", // language to use if translations in user language are not available
		ns: ["home", "login", "signup", "forms", "errors"], // available namespaces
		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
