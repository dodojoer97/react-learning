// src/services/authService.ts
import userRepository from "../repositories/UserRepository";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

class AuthService {
	private jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

	async login(email: string, password: string): Promise<string | null> {
		const user = await userRepository.getUserByEmail(email);
		if (user && bcrypt.compareSync(password, user.password as string)) {
			return jwt.sign({ uid: user.uid, email: user.email }, this.jwtSecret, {
				expiresIn: "1h",
			});
		}
		return null;
	}

	async register(email: string, password: string): Promise<string | null> {
		const hashedPassword = bcrypt.hashSync(password, 10);
		const newUser = await userRepository.createUser(email, hashedPassword);
		if (newUser) {
			return jwt.sign({ uid: newUser.uid, email: newUser.email }, this.jwtSecret, {
				expiresIn: "1h",
			});
		}
		return null;
	}

	async verifyToken(token: string): Promise<{ valid: boolean; user?: any }> {
		try {
			const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
			const user = await userRepository.getUserByEmail(decoded.email);
			if (user) {
				return { valid: true, user };
			}
			return { valid: false };
		} catch (error) {
			return { valid: false };
		}
	}
}

export default new AuthService();
