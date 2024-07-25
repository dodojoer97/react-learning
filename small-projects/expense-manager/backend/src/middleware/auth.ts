import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.sendStatus(401); // If there's no token, return unauthorized

	const secret = process.env.JWT_SECRET || "your_jwt_secret";

	jwt.verify(token, secret, (err: any, user: any) => {
		if (err) return res.sendStatus(403); // If token is invalid, return forbidden

		// @ts-ignore
		req.user = user; // Attach the user to the request object
		next(); // Proceed to the next middleware or route handler
	});
}
