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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const CategoryService_1 = __importDefault(require("../services/CategoryService"));
const _common_1 = require("@common");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger = new _common_1.Logger("AuthController");
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                const token = yield AuthService_1.default.login(email, password);
                if (token) {
                    res.json({ token });
                }
                else {
                    res.status(401).json({ message: "Invalid email or password" });
                }
            }
            catch (error) {
                if ((0, _common_1.isFirebaseError)(error)) {
                    switch (error.code) {
                        case "auth/wrong-password":
                            res.status(401).json({ message: "Wrong password" });
                            break;
                        case "auth/user-not-found":
                            res.status(404).json({ message: "User not found" });
                            break;
                        // Handle other Firebase Auth errors
                        default:
                            logger.error(`Firebase Auth Error during login: ${error.message}`);
                            res.status(500).json({ message: "Internal server error" });
                    }
                }
                else if ((0, _common_1.isError)(error)) {
                    logger.error(`Error during login: ${error.message}`);
                    res.status(500).json({ message: "Internal server error" });
                }
                else {
                    logger.error("An unknown error occurred during login");
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    throw new Error("Email and password are required");
                }
                const token = yield AuthService_1.default.register(email, password);
                if (token) {
                    const { uid } = jsonwebtoken_1.default.decode(token);
                    yield CategoryService_1.default.addDefaultCategoriesForUser(uid);
                    res.status(201).json({ token });
                }
                else {
                    res.status(400).json({ message: "Registration failed" });
                }
            }
            catch (error) {
                if ((0, _common_1.isFirebaseError)(error)) {
                    switch (error.code) {
                        case "auth/email-already-in-use":
                            res.status(400).json({ message: "Email already in use" });
                            break;
                        // Handle other Firebase Auth errors
                        default:
                            logger.error(`Firebase Auth Error during registration: ${error.message}`);
                            res.status(500).json({ message: "Internal server error" });
                    }
                }
                else if ((0, _common_1.isError)(error)) {
                    logger.error(`Error during registration: ${error.message}`);
                    res.status(500).json({ message: "Internal server error" });
                }
                else {
                    logger.error("An unknown error occurred during registration");
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                if (!token) {
                    return res.status(401).json({ message: "No token provided" });
                }
                const result = yield AuthService_1.default.verifyToken(token);
                if (result.valid) {
                    res.status(200).json({ valid: true, user: result.user });
                }
                else {
                    res.status(401).json({ message: "Invalid token" });
                }
            }
            catch (error) {
                if ((0, _common_1.isFirebaseError)(error)) {
                    logger.error(`Firebase Auth Error during token verification: ${error.message}`);
                    res.status(500).json({ message: "Internal server error" });
                }
                else if ((0, _common_1.isError)(error)) {
                    logger.error(`Error during token verification: ${error.message}`);
                    res.status(500).json({ message: "Internal server error" });
                }
                else {
                    logger.error("An unknown error occurred during token verification");
                    res.status(500).json({ message: "Internal server error" });
                }
            }
        });
    }
}
exports.default = new AuthController();
