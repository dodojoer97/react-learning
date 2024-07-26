import * as admin from "firebase-admin";
import * as serviceAccount from "../../serviceAccountKey.json";

console.log("serviceAccount: ", serviceAccount);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const db = admin.firestore();
db.settings({
	host: "localhost:8080",
	ssl: false,
});

export { db, admin };
