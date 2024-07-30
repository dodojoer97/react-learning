"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../config/firebase");
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _common_1 = require("@common");
const logger = new _common_1.Logger("AuthService");
class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                const userCredential = yield (0, firebase_1.signInWithEmailAndPassword)(firebase_1.auth, email, password);
                const user = userCredential.user;
                if (user) {
                    const token = jsonwebtoken_1.default.sign({ uid: user.uid, email: user.email }, this.jwtSecret, {
                        expiresIn: "1h",
                    });
                    logger.info(`User ${email} logged in successfully`);
                    return token;
                }
                logger.warn(`Login failed for user ${email}`);
                return null;
            }
            catch (error) {
                if ((0, _common_1.isError)(error)) {
                    logger.error(`Error during login: ${error.message}`);
                    throw new Error();
                }
                else {
                    logger.error("An unknown error occurred during login");
                }
                throw error;
            }
        });
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                const userCredential = yield (0, firebase_1.createUserWithEmailAndPassword)(firebase_1.auth, email, password);
                const user = userCredential.user;
                if (user) {
                    const token = jsonwebtoken_1.default.sign({ uid: user.uid, email: user.email }, this.jwtSecret, {
                        expiresIn: "1h",
                    });
                    logger.info(`User ${email} registered successfully`);
                    return token;
                }
                logger.warn(`Registration failed for user ${email}`);
                return null;
            }
            catch (error) {
                if ((0, _common_1.isError)(error)) {
                    logger.error(`Error during registration: ${error.message}`);
                }
                else {
                    logger.error("An unknown error occurred during registration");
                }
                throw error;
            }
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new Error("Token is required");
                }
                const decoded = jsonwebtoken_1.default.verify(token, this.jwtSecret);
                console.log("decoded: ", decoded);
                const user = yield UserRepository_1.default.getUserByEmail(decoded.email);
                if (user) {
                    logger.info(`Token verified for user ${decoded.email}`);
                    return { valid: true, user };
                }
                logger.warn(`Token verification failed for token: ${token}`);
                return { valid: false };
            }
            catch (error) {
                if ((0, _common_1.isError)(error)) {
                    logger.error(`Error during token verification: ${error.message}`);
                }
                else {
                    logger.error("An unknown error occurred during token verification");
                }
                return { valid: false };
            }
        });
    }
}
exports.default = new AuthService();
