import { ITranslations } from "@/locales/translation.interface";

export const translations: ITranslations = {
	home: {
		homeTitle: "Expense Manager",
		homeDesc:
			"Efficiently manage your finances with our Expense Manager. This tool provides detailed insights into your spending, helping you budget wisely and save effectively. Stay on top of your finances and make informed decisions with ease.",
		title: "Home",
	},
	login: {
		signin: "Sign in",
		loginTitle: "Login",
		loginDesc:
			"Securely access your account with our simple login process. Ensure your data's safety while enjoying hassle-free entry to manage your tasks efficiently.",
		signup: "Sign up",
		noAccount: "No account? ",
		forgotPassword: "Forgot Password?",
		title: "Login",
	},
	signup: {
		signupTitle: "Get started Today!",
		signupDesc:
			"Begin your journey with our user-friendly platform today. Enjoy easy access and straightforward setup to help you get started smoothly and efficiently. We're here to support you every step of the way!",
		createAccount: "Create account",
		hasAccount: "Have an account?",
		signin: "Sign in",
		title: "Sign in",
	},
	forms: {
		enterEmail: "Enter email",
		enterPassword: "Enter password",
		currency: "Choose a currency",
		seperator: "Choose a seperator",
		save: "Save",
	},
	header: {
		signin: "Log in",
		signup: "Sign up",
		settings: "Settings",
		categories: "Categories",
	},
	settings: {
		title: "Settings",
		categoriesTitle: "Categories",
	},
	resetPassword: {
		resetPassword: "Reset password",
		title: "Reset password",
		sendLink: "Send Reset Link",
		resetPasswordSuccessMessage: "Password changed, Please Log in",
		emailSent: "An email will be sent to the provided email address",
	},
	errors: {
		invalidAmount: "Amount must be greater than zero.",
		missingDate: "Transaction date is required.",
		missingCategory: "Transaction category is required.",
		noDraftOrUser: "No draft transaction or user ID available.",
		errorProcessingTransaction: "Error processing the transaction.",
		failedToProcessTransaction: "Failed to process the transaction.",
		noEmailMatching: "Email must contain @",
		notPasswordLength: "Password has to have at least 8 chars",
		notMatchingPasswords: "Passwords do not match",
		invalidLength: "Must have {{min}} letters",
	},
};
