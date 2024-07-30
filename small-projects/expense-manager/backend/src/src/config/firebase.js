"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDb = exports.admin = exports.clientDb = exports.signInWithEmailAndPassword = exports.createUserWithEmailAndPassword = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
Object.defineProperty(exports, "createUserWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.createUserWithEmailAndPassword; } });
Object.defineProperty(exports, "signInWithEmailAndPassword", { enumerable: true, get: function () { return auth_1.signInWithEmailAndPassword; } });
const firestore_1 = require("firebase/firestore");
const dotenv_1 = __importDefault(require("dotenv"));
const admin = __importStar(require("firebase-admin"));
exports.admin = admin;
const serviceAccount = __importStar(require("../../serviceAccountKey.json"));
// Load environment variables from .env file
dotenv_1.default.config();
// Initialize Firebase Client SDK
const clientConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const clientApp = (0, app_1.initializeApp)(clientConfig);
const auth = (0, auth_1.getAuth)(clientApp);
exports.auth = auth;
if (process.env.USE_FIREBASE_EMULATOR === "true") {
    (0, auth_1.connectAuthEmulator)(auth, "http://localhost:9099");
}
const clientDb = (0, firestore_1.getFirestore)(clientApp);
exports.clientDb = clientDb;
if (process.env.USE_FIREBASE_EMULATOR === "true") {
    (0, firestore_1.connectFirestoreEmulator)(clientDb, "localhost", 8080);
}
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
});
if (process.env.USE_FIREBASE_EMULATOR === "true") {
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
    process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
}
const adminDb = admin.firestore();
exports.adminDb = adminDb;
