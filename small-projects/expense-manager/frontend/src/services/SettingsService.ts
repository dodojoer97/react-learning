// Interface
import { ISettingsService } from "./SettingsService.interface";

// Classes
import BaseService from "./BaseService";

// Models
import { Category } from "@common";
import SelectFieldOption from "@/models/SelectFieldOption";

// DTO
import GetCategoriesDTO from "@/DTO/response/GetCategories";

// Config
import { categoryIcons } from "@/config/categoryIcons";

/**
 *  SettingsService class for handling settings.
 *  Extends BaseService to use common service functionalities.
 */
class SettingsService extends BaseService implements ISettingsService {
	/**
	 * SettingsService constructor.
	 * Sets up the base URL for the API.
	 */
	constructor() {
		const baseUrl = "http://localhost:3000";
		super(baseUrl);
	}
}

export default SettingsService;
