export interface ITranslations {
	login: ILoginTranslations;
	signup: ISignupTranslations;
	forms: IFormTranslations;
	header: IHeaderTranslations;
	settings: ISettingsTranslations;
	resetPassword: IResetPasswordTranslations;
	account: IAccountTranslations;
	categories: ICategoriesTranslations;
	errors: IErrorMessages;
	notifications: INotificationTranslations;
	transactions: ITransactionTranslations;
	analytics: IAnalyticsTranslations;
}

export interface IPageTranslations {
	title: string;
}

export interface IAnalyticsTranslations extends IPageTranslations {
	userBalance: string;
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
export interface IAccountTranslations extends IPageTranslations {
	myAccount: string;
	personalInfo: string;
	emailTitle: string;
	passwordTitle: string;
	setPassword: string;
}

export interface ICategoriesTranslations extends IPageTranslations {
	selectIcon: string;
	add: string;
}

export interface ITransactionTranslations {
	transaction: string;
	chooseCategory: string;
	details: string;
	date: string;
	recursionDate: string;
	expenseStructure: string;
	latest: string;
	overview: string;
	add: string;
}

export interface IFormTranslations {
	enterEmail: string;
	enterPassword: string;
	currency: string;
	seperator: string;
	save: string;
	cancel: string;
	enterName: string;
	categoryName: string;
	recurringType: string;
	frequency: string;
	description: string;
	categoryType: string;
}

export interface IHeaderTranslations {
	signin: string;
	signup: string;
	settings: string;
	categories: string;
	logout: string;
	expenseManager: string;
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

export interface INotificationTranslations {
	cancel: string;
	confirmDelete: string;
	deleteBaseTitle: string;
}
