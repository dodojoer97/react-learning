import * as admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccountKey.json";

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";

const db = admin.firestore();
db.settings({
	host: "localhost:8080",
	ssl: false,
});

export { db, admin };
