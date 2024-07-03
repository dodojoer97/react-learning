export interface IBaseService {
	baseUrl: string;
}

export class BaseService implements IBaseService {
	baseUrl: string;
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	protected getDefaultHeaders(): Record<string, string> {
		return {
			"Content-type": "application/json; charset=UTF-8",
		};
	}
}
