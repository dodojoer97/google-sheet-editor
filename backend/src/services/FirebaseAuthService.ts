import admin from "firebase-admin";
import * as dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

class FirebaseAuthService {
	private static instance: FirebaseAuthService;

	private constructor() {
<<<<<<< HEAD:backend/src/services/FirebaseAuthService.ts
		// ✅ Use dotenv to load service account credentials from process.env
		const serviceAccountString = process.env.GOOGLE_SERVICE_ACCOUNT;
		if (!serviceAccountString) {
			throw new Error(
				"Service account not found. Make sure GOOGLE_SERVICE_ACCOUNT is set in .env"
			);
		}

		const serviceAccount = JSON.parse(serviceAccountString);

=======
>>>>>>> parent of 48cb909 (add functions):functions/src/services/FirebaseAuthService.ts
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
