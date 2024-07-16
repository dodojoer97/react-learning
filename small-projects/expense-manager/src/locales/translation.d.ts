export interface IHomeTranslation {
	homeTitle: string
	homeDesc: string
}
export interface ILoginTranslations {
	loginTitle: string
	loginDesc: string
	signin: string
	noAccount: string
	signup: string
}

export interface IFormTranslations {
	enterPassword: string
	enterEmail: string
}

export interface ISignupTranslations {
    signupTitle: string
    signupDesc: string
    createAccount: string
}

export interface ILocaleTranslations {
    home: IHomeTranslation,
    login: ILoginTranslations,
    signup: ISignupTranslations,
    forms: IFormTranslations
}

export interface ITranslationResources {
    [language: string]: {
        translation: ILocaleTranslations;
    };
}
