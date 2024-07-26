// firebaseClient.ts

import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore as getClientFirestore } from "firebase/firestore";
import dotenv from "dotenv";
import * as admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccountKey.json";

// Load environment variables from .env file
dotenv.config();

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

const clientApp = initializeClientApp(clientConfig);
const auth = getAuth(clientApp);
const clientDb = getClientFirestore(clientApp);

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();
db.settings({
	host: "localhost:8080",
	ssl: false,
});

// Exporting Client SDK instances
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, clientDb };

// Exporting Admin SDK instances
export { admin, db };
