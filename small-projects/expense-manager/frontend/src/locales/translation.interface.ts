export interface ITranslations {
	home: IHomeTranslation;
	login: ILoginTranslations;
	signup: ISignupTranslations;
	forms: IFormTranslations;
	header: IHeaderTranslations;
	settings: ISettingsTranslations;
	resetPassword: IResetPasswordTranslations;
	errors: IErrorMessages;
}

export interface IPageTranslations {
	title: string;
}

export interface IHomeTranslation extends IPageTranslations {
	homeTitle: string;
	homeDesc: string;
}

export interface ILoginTranslations extends IPageTranslations {
	signin: string;
	loginTitle: string;
	loginDesc: string;
	signup: string;
	noAccount: string;
	forgotPassword: string;
}

export interface ISignupTranslations extends IPageTranslations {
	signupTitle: string;
	signupDesc: string;
	createAccount: string;
	hasAccount: string;
	signin: string;
}

export interface ISettingsTranslations extends IPageTranslations {
	categoriesTitle: string;
}

export interface IResetPasswordTranslations extends IPageTranslations {
	resetPassword: string;
	sendLink: string;
	emailSent: string;
	resetPasswordSuccessMessage: string;
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
