export interface ITranslations {
	home: IHomeTranslation;
	login: ILoginTranslations;
	signup: ISignupTranslations;
	forms: IFormTranslations;
	header: IHeaderTranslations;
	settings: ISettingsTranslations;
	errors: IErrorMessages;
}

export interface IHomeTranslation {
	homeTitle: string;
	homeDesc: string;
}

export interface ILoginTranslations {
	signin: string;
	loginTitle: string;
	loginDesc: string;
	signup: string;
	noAccount: string;
	forgotPassword: string;
}

export interface ISignupTranslations {
	signupTitle: string;
	signupDesc: string;
	createAccount: string;
	hasAccount: string;
	signin: string;
}

export interface IFormTranslations {
	enterEmail: string;
	enterPassword: string;
	currency: string;
	seperator: string;
	save: string;
}

export interface IHeaderTranslations {
	signin: string;
	signup: string;
	settings: string;
	categories: string;
}

export interface ISettingsTranslations {
	settingsTitle: string;
	categoriesTitle: string;
}

export interface IErrorMessages {
	invalidAmount: string;
	missingDate: string;
	missingCategory: string;
	noDraftOrUser: string;
	errorProcessingTransaction: string;
	failedToProcessTransaction: string;
	noEmailMatching: string;
	notPasswordLength: string;
	notMatchingPasswords: string;
	invalidLength: string;
}
