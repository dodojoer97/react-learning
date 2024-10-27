import nodemailer from "nodemailer";

// Util
import { isError } from "@/utils/isError";

class EmailClient {
	private transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: "gmail", // or use an external provider like SendGrid, AWS SES, etc.
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	async sendEmail(to: string, subject: string, text: string, html: string) {
		try {
			await this.transporter.sendMail({
				from: process.env.EMAIL_ADDRESS,
				to,
				subject,
				text,
				html,
			});
		} catch (error) {
			if (isError(error)) {
				throw new Error(`Failed to send email: ${error.message}`);
			}
			throw error;
		}
	}
}

export default new EmailClient();
