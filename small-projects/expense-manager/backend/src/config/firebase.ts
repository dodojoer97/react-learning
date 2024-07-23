// src/config/firebase.ts
import * as admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccountKey.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();
export { db };
