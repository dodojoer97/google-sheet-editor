import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";

const firebaseConfig = {
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_PROJECT_ID.appspot.com",
	messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
	appId: "YOUR_APP_ID",
};

class FirebaseAuthService {
	private static instance: FirebaseAuthService;
	private auth;
	private provider;

	private constructor() {
		const app = initializeApp(firebaseConfig);
		this.auth = getAuth(app);
		this.provider = new GoogleAuthProvider();
	}

	public static getInstance(): FirebaseAuthService {
		if (!FirebaseAuthService.instance) {
			FirebaseAuthService.instance = new FirebaseAuthService();
		}
		return FirebaseAuthService.instance;
	}

	public async signInWithGoogle(): Promise<User | null> {
		try {
			const result = await signInWithPopup(this.auth, this.provider);
			return result.user;
		} catch (error) {
			console.error("Google Sign-In Error:", error);
			return null;
		}
	}

	public async signOutUser(): Promise<void> {
		try {
			await signOut(this.auth);
		} catch (error) {
			console.error("Sign-Out Error:", error);
		}
	}

	public getAuthInstance() {
		return this.auth;
	}
}

export default FirebaseAuthService.getInstance();
