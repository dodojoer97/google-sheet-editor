import admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

class FirebaseAuthService {
	private static instance: FirebaseAuthService;

	private constructor() {
		admin.initializeApp({
			credential: admin.credential.cert(require("../../service-account.json")),
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
