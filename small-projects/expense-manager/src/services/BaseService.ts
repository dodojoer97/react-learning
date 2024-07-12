// Interface
import { IBaseService } from "./BaseService.d";

/**
 * Base service class to be used by other services, provides a base url, and a method to append headers to requests
 */
class BaseService implements IBaseService {
	baseUrl: string;
	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	getDefaultHeaders(): Record<string, string> {
		return {
			"Content-Type": "application/json",
		};
	}
}

export default BaseService;
