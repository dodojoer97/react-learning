import { Request, Response } from "express";
import { isError, Logger } from "@common";

// Models
import { User } from "@common";

// Service
import settingsService from "@/services/SettingsService";

const logger = new Logger("SettingsController");

class SettingsController {
	async getSettings(req: Request, res: Response) {
		const { userId } = req.params;
		try {
			const userSettings = await settingsService.getSettings(userId);

			if (userSettings) {
				res.status(200).json(userSettings);
			} else {
				res.status(404).json({ message: "No settings found for user id" });
			}
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during getSettings: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during getSettings");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}

	async updateSettings(req: Request, res: Response) {
		const { userId, fields } = req.body;
		try {
			const userSettings = await settingsService.updateSettings(userId, {
				currency: fields.curreny,
			});

			if (userSettings) {
				res.status(200).json(userSettings);
			} else {
				res.status(404).json({ message: "No settings found for user id" });
			}
		} catch (error) {
			if (isError(error)) {
				logger.error(`Error during updateSettings: ${error.message}`);
				res.status(500).json({ message: "Internal server error" });
			} else {
				logger.error("An unknown error occurred during updateSettings");
				res.status(500).json({ message: "Internal server error" });
			}
		}
	}
}

export default new SettingsController();
