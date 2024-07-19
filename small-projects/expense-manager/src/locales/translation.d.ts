export interface IHomeTranslation {
	homeTitle: string;
	homeDesc: string;
}
export interface ILoginTranslations {
	loginTitle: string;
	loginDesc: string;
	signin: string;
	noAccount: string;
	signup: string;
}

export interface IFormTranslations {
	enterPassword: string;
	enterEmail: string;
	notPasswordLength: string;
	notMatchingPasswords: string;
	noEmailMatching: string;
}

export interface ISignupTranslations {
	signupTitle: string;
	signupDesc: string;
	createAccount: string;
}

export interface IHeaderTranslations {
	signin: string;
	signup: string;
	settings: string;
	categories: string;
}

export interface ISettingsTranslations {
	settingsTitle: string;
}

export interface ILocaleTranslations {
	[locale: string]: {
		home: IHomeTranslation;
		login: ILoginTranslations;
		signup: ISignupTranslations;
		forms: IFormTranslations;
		header: IHeaderTranslations;
		settings: ISettingsTranslations;
	};
}
