export interface IBaseService {
	baseUrl: string;
	getDefaultHeaders(): Record<string, string>;
}
