export class UserSettings {
	currency: string;
	numberSeperator: "." | ",";
	userId: string;
	id: string;
	constructor(settings: UserSettings) {
		this.currency = settings.currency;
		this.userId = settings.userId;
		this.id = settings.id;
		this.numberSeperator = settings.numberSeperator;
	}
}
