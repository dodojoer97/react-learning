// services/EmailService.ts
import EmailClient from "../clients/EmailClient";
import jwt from "jsonwebtoken";

class EmailService {
	async sendPasswordResetEmail(email: string) {
		const secret = process.env.JWT_SECRET || "your_jwt_secret";

		// Generate a token for password reset
		const resetToken = jwt.sign({ email }, secret, { expiresIn: "1h" });

		// Craft the password reset email content
		const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
		const subject = "Password Reset Request";
		const text = `You requested a password reset. Click here to reset your password: ${resetUrl}`;
		const html = `<p>You requested a password reset.</p><p><a href="${resetUrl}">Click here to reset your password</a></p>`;

		// Send email using EmailClient
		await EmailClient.sendEmail(email, subject, text, html);
	}
}

export default new EmailService();
