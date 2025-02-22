import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as functions from "firebase-functions";

dotenv.config();

class FirebaseAuthService {
	private static instance: FirebaseAuthService;

	private constructor() {
		// ✅ Use Firebase Functions config to store service account credentials
		const serviceAccount = JSON.parse(functions.config().google.service_account);

		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		});
	}

	public static getInstance(): FirebaseAuthService {
		if (!FirebaseAuthService.instance) {
			FirebaseAuthService.instance = new FirebaseAuthService();
		}
		return FirebaseAuthService.instance;
	}

	public async verifyToken(token: string): Promise<admin.auth.DecodedIdToken | null> {
		try {
			return await admin.auth().verifyIdToken(token);
		} catch (error) {
			console.error("Invalid Firebase token:", error);
			return null;
		}
	}
}

export default FirebaseAuthService.getInstance();
