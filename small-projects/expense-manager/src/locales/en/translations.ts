// Types
import {ILocaleTranslations, IHomeTranslation, ILoginTranslations, IFormTranslations, ISignupTranslations} from "@/locales/translation.d"

// Translations for the home page
const homeTranslations: IHomeTranslation = {
	homeTitle: "Expense Manager",
	homeDesc: "Efficiently manage your finances with our Expense Manager. This tool provides detailed insights into your spending, helping you budget wisely and save effectively. Stay on top of your finances and make informed decisions with ease.",
}

// Translations for the login page
const loginTranslations: ILoginTranslations = {
	signin: "Sign in",
	loginTitle: "Login",
	loginDesc: "Securely access your account with our simple login process. Ensure your data's safety while enjoying hassle-free entry to manage your tasks efficiently.",
	signup: "Sign up",
	noAccount: "No account? ",
}

// Translations for the signup page
const signupTranslations: ISignupTranslations = {
	signupTitle: "Get started Today!",
	signupDesc: "Begin your journey with our user-friendly platform today. Enjoy easy access and straightforward setup to help you get started smoothly and efficiently. We're here to support you every step of the way!",
	createAccount: "Create acount"	
}


// Translations for the forms
const formsTranslations: IFormTranslations = {
	enterEmail: "Enter email",
	enterPassword: "Enter password"
}


const translations: ILocaleTranslations = {
	home: homeTranslations,
	login: loginTranslations,
	signup: signupTranslations,
	forms: formsTranslations
}

export default translations