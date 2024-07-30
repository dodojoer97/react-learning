"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401); // If there's no token, return unauthorized
    const secret = process.env.JWT_SECRET || "your_jwt_secret";
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err)
            return res.sendStatus(403); // If token is invalid, return forbidden
        // @ts-ignore
        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route handler
    });
}
